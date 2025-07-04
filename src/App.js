import React, { useState}  from 'react';
// import ScoreCard from './components/scorecard';
// import QuizCard from "./components/quizcard";
// // import Button from "./components/button";
import Signup from './components/signup';
import Login from './components/login';
// Routing in react
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatWindow from './components/chatWindow';
import Chat from './pages/Chat';
import "./css/style.css";
import "./css/signup.css";
import "./css/chatStyle.css";

// function App() {

// 	// this section is for the chatApp
// 	const [messages, setMessages] = useState([]);
// 	const [input, setInput] = useState('');

// 	const handleSend = () => {
// 		if (!input.trim()) return;

// 		const newMessage = { sender: 'You', text: input };
// 		setMessages([...messages, newMessage]);

// 		// Simulate bot reply 
// 		setTimeout(() => {
// 			setMessages(prev => [...prev, { sender: 'Bot', text: `${input}` }]);
// 		}, 500);

// 		setInput('');
// 	};

// 	return (
// 		<div >
// 			<h1>Welcome To The Quiz Page</h1>
// 			{/* <Button text='Login'/>
// 			<Button text='Signup'/>
// 			<CustomButton /> */}
// 			<div>
// 				<QuizCard number={1} question="What is the state of Abeokuta ?" options={['Owode', 'Ogun', 'Ifo', 'Shagamu']} />
// 			</div>

// 			<div>
// 				<ScoreCard score={40} total={100} comment="You no try at all. Better go read." />
// 			</div>

// 			<div>
// 				<Signup onSignup={setRegisteredUser} />
// 			</div>

// 			<div>
// 				<Login registeredUser={registeredUser} />
// 			</div>

// 			<div className='container'>
// 				<div className='chatBox'>
// 					{messages.map((msg, i) => (
// 						<Chatapp key={i} sender={msg.sender} text={msg.text} />
// 					))}
// 				</div>

// 				<ChatInput value={input} onchange={setInput} onsubmit={handleSend} />
// 			</div>
// 		</div>
// 	);
// }

// export default App;


export default function App() {
	// const [registeredUser, setRegisteredUser] = useState("");
	const [isAuth, setIsAuth] = useState("");

	return (
		<Router>
			<Routes>
				<Route Component={ Signup } path='/' /> 
				{/* Do this when you don't have props to pass into the component */}
				{/* <Route Component={component name} path='componentpath'/> */}
				<Route element={<Signup />} path='/signup' />
				<Route Component={ Login } path='/login' />
				{/* For the chat app */}
				<Route Component={ ChatWindow } path='/chatWindow' />
				<Route element={<Chat isAuth={isAuth} setIsAuth={setIsAuth}  />} path='/Chat' />

			</Routes>
		</Router>
	)
}
