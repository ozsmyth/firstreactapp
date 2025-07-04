import React, { useEffect, useRef, useState } from 'react';
//import { useAuth } from '../../contexts/AuthContext';
import {
	Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText,
	Divider, Badge, IconButton, Drawer, Avatar, Tooltip, Snackbar, Alert
} from '@mui/material';
import { io } from 'socket.io-client';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import { loginUtils } from '../utils/api';

const SOCKET_URL = 'http://192.168.43.26:4000';

const Chat = ({isAuth, setIsAuth}) => {
	//const { user, logout } = useAuth();
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const socketRef = useRef(null);
	const messagesEndRef = useRef(null);
	const audioRef = useRef(new Audio('/notification.wav'));
	const redirect = useNavigate();
	const user = useRef(null); 
	

	function logout(){
		loginUtils();
		setIsAuth(false);
		redirect("/login");
	}

	useEffect(() => {
		// checking if the person accessing the page is a user
		const token = localStorage.getItem('token');
		const username = sessionStorage.getItem("chat-app-user");
		if (token && username) {
			setIsAuth(true);
			// update the null user
			user.current = username;
			// Set default auth header
			//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			// we would send this from a higher component 
			//setIsAuthenticated(true);
			// we also verify the token b4 using setIsAuth etc
		} else {
			// redirect to login page
			redirect('/login');
		}
		setLoading(false);
	}, []);

	useEffect(() => {
	  const token = localStorage.getItem('token');
	  const socket = io(SOCKET_URL, {
	    auth: { token },
	  });
	  socketRef.current = socket;

	//   socket.emit('join');

	//   socket.on('messageHistory', (history) => {
	//     setMessages(history);
	//   });

	// Listening for messages emitted from the backend
	  socket.on('message', (msg) => {
	    setMessages((prev) => [...prev, msg]);
	    // Show notification for new messages (except system messages and own messages)
	    if (msg.sender !== 'System' && msg.sender !== user.current) {
	      const notification = `${msg.sender}: ${msg.content}`;
	      setNotifications(prev => [...prev, notification]);
	      setNotificationMessage(notification);
	      setShowNotification(true);
	      audioRef.current.play().catch(() => {}); // Play notification sound
	    }
	  });

	  socket.on('userList', (users) => {
	    setOnlineUsers(users);
	  });
	  
	  socket.on('connect_error', (err) =>{
		console.error('Socket connection error:', err.message);
		if(err.message.includes('Authentication error')) {
			alert('Authentication failed. Please log in again.');
			// we can logout, redirect / clear token etc.
		} else {
			// other connection errors (e.g server down)
			alert('Failed to connect to chat server. Please try again later.');
		}
		redirect('/login');
	  });
	  
	  socket.on('connect', () =>{
		console.log('Socket connected successfully!!');
		socket.emit('join');
		// i probably would or do other things in here like updating user connected etc.
	  });

	  return () => {
	    socket.disconnect();
	  };
	}, []);

	useEffect(() => {
	  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSend = (e) => {
	  e.preventDefault();
	  if (input.trim()) {
	    socketRef.current.emit('chat', { content: input });
	    setInput('');
	  }
	};

	const handleNotificationClose = () => {
	  setShowNotification(false);
	};

	const clearNotifications = () => {
	  setNotifications([]);
	};

	if(!isAuth){
		return (
			<div>
				<p>Validate User...</p>
			</div>
		);
	}

	return (
		<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh" p={2}>
			<Paper elevation={6} sx={{ width: '100%', maxWidth: 800, p: 2, display: 'flex' }}>
				{/* Main Chat Area */}
				<Box sx={{ flex: 1, mr: 2 }}>
					<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
						<Typography variant="h6">Group Chat</Typography>
						<Box>
							<Tooltip title={`${notifications.length} new messages`}>
								<IconButton color="primary" onClick={clearNotifications}>
									<Badge badgeContent={notifications.length} color="error">
										<NotificationsIcon />
									</Badge>
								</IconButton>
							</Tooltip>
							<Tooltip title="Online Users">
								<IconButton color="primary" onClick={() => setDrawerOpen(true)}>
									<PeopleIcon />
								</IconButton>
							</Tooltip>
							<Button color="secondary" onClick={logout} sx={{ ml: 1 }}>Logout</Button>
						</Box>
					</Box>
					<Divider sx={{ mb: 2 }} />
					<List sx={{
						minHeight: 400,
						maxHeight: 500,
						overflowY: 'auto',
						bgcolor: 'background.paper',
						borderRadius: 1,
						p: 1
					}}>
						{messages.map((msg, idx) => (
							<ListItem
								key={idx}
								alignItems="flex-start"
								sx={{
									bgcolor: msg.sender === 'System' ? 'action.hover' : 'transparent',
									borderRadius: 1,
									mb: 0.5
								}}
							>
								<ListItemText
									primary={
										<Box display="flex" alignItems="center">
											<Typography
												component="span"
												sx={{
													fontWeight: 'bold',
													color: msg.sender === 'System' ? 'text.secondary' : 'primary.main'
												}}
											>
												{msg.sender}
											</Typography>
											<Typography
												component="span"
												sx={{
													fontSize: '0.8em',
													color: 'text.secondary',
													ml: 1
												}}
											>
												{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}
											</Typography>
										</Box>
									}
									secondary={msg.content}
								/>
							</ListItem>
						))}
						<div ref={messagesEndRef} />
					</List>
					<form onSubmit={handleSend} style={{ display: 'flex', marginTop: 16 }}>
						<TextField
							value={input}
							onChange={e => setInput(e.target.value)}
							placeholder="Type a message..."
							fullWidth
							size="small"
							sx={{ mr: 1 }}
						/>
						<Button type="submit" variant="contained" color="primary">Send</Button>
					</form>
				</Box>

				{/* Online Users Drawer */}
				<Drawer
					anchor="right"
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
				>
					<Box sx={{ width: 250, p: 2 }}>
						<Typography variant="h6" gutterBottom>
							Online Users ({onlineUsers.length})
						</Typography>
						<List>
							{onlineUsers.map((username) => (
								<ListItem key={username}>
									<Avatar sx={{ width: 32, height: 32, mr: 1 }}>
										{username[0].toUpperCase()}
									</Avatar>
									<ListItemText
										primary={username}
										secondary={username === user.username ? 'You' : 'Online'}
									/>
								</ListItem>
							))}
						</List>
					</Box>
				</Drawer>

				{/* Notification Snackbar */}
				<Snackbar
					open={showNotification}
					autoHideDuration={4000}
					onClose={handleNotificationClose}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				>
					<Alert
						onClose={handleNotificationClose}
						severity="info"
						sx={{ width: '100%' }}
					>
						{notificationMessage}
					</Alert>
				</Snackbar>
			</Paper>
		</Box>
	);
};

export default Chat; 