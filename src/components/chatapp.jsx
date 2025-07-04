// This is the chat message component codeblock
import React from 'react';
import avatarBot from '../img/avatarBot.avif';
import avatarUser from '../img/avatarUser.jpg';


// Chatapp renders a sigle message with sender avatar and timestamp
export default function Chatapp({ sender, text, time }) { 
    const isBot = sender === 'Bot';

    const containerStyle = {
        display: 'flex',
        flexDirection: isBot ? 'row' : 'row-reverse',
        alignItems: 'flex-end',
        margin: '10px 0',
    }

    const avatarStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        bojectFit: 'cover',
        margin: '0 3px',
        border: '2px solid #ccc',
    }

    const messageStyle = {
        // backgroundColor: isBot ? '#e0f7fa' : '#c8e6c9',
        backgroundColor: isBot ? '#9f33ff' : '#168aff',
        padding: '10px 15px',
        margin: '5px',
        maxWidth: '80%',
        wordBreak: 'break-word',
        borderRadius: '10px',
        color: 'white',
    };

    const timeStyle ={
        fontSize: '0.7rem',
        color: '#ccc',
        marginTop: '4px',
        textAlign: isBot ? 'left' : 'right',
    };

    const avatarSrc = isBot ? avatarBot : avatarUser;

    return (
        <div style={ containerStyle }>
            <img src={avatarSrc} alt={`${sender} avatar`} style={avatarStyle} />
            <div>
                <div style={ messageStyle }>
                    <strong>{sender}:</strong> {text}
                </div>
                <div style={timeStyle}>{time}</div>
            </div>
        </div>
        
    );
}
