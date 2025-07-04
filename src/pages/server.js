const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  }
});

// Store messages and online users
const messages = [];
const onlineUsers = new Map();

// Socket.IO authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req,res)=>{
  return res.json("WELCOME TO OUR CHAT API ");
})
// Swagger Docs
const swaggerDocument = YAML.load("./swagger/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


async function runMongoConnect() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(error){
    console.log(error.message);
  }
}
//runMongoConnect().catch(console.dir);

//Connect to MongoDB locally
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  const username = socket.user.username;
  
  // Add user to online users
  onlineUsers.set(username, socket.id);
  io.emit("userList", Array.from(onlineUsers.keys()));

  // Send message history to new user
  socket.emit("messageHistory", messages);

  socket.on("join", () => {
    console.log(`${username} joined`);
    const joinMessage = {
      sender: "System",
      content: `${username} has joined the chat.`,
      timestamp: new Date().toISOString()
    };
    messages.push(joinMessage);
    io.emit("message", joinMessage);
  });

  socket.on("chat", ({ content }) => {
    const message = { 
      sender: username, 
      content,
      timestamp: new Date().toISOString()
    };
    messages.push(message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`${username} disconnected`);
    onlineUsers.delete(username);
    const leaveMessage = {
      sender: "System",
      content: `${username} has left the chat.`,
      timestamp: new Date().toISOString()
    };
    messages.push(leaveMessage);
    io.emit("message", leaveMessage);
    io.emit("userList", Array.from(onlineUsers.keys()));
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
