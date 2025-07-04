// This is the chatBox component codeblock
import React, { useState } from 'react';
import Chatapp from './chatapp'; // This is the chatMessage codeblock import
import ChatInput from './chatInput';

// ChatWindow(chatbox) displays all messages using the chatapp(chatMessage) component
export default function ChatWindow() {
    // this section is for the chatApp
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Adds user message and bot reply to the chat and Simulate bot reply 
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'You', text: input, time: now }, { sender: 'Bot', text: `${input}`, time: now }]);
        }, 500);

        setInput('');
    };
    return (
        <div className='container'>
            <div className='chatBox'>
                {messages.map((msg, i) => (
                    <Chatapp key={i} sender={msg.sender} text={msg.text} time={msg.time} />
                ))}
            </div>

            <ChatInput value={input} onchange={setInput} onsubmit={handleSend} />
        </div>
    )   
}
