import React from 'react'
import { CustomButton } from './button';

//  ChatInput handles the user input and emoji selection
export default function ChatInput({ value, onchange, onsubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onsubmit();
    };
    
    return (
        <form onSubmit={handleSubmit} style={styles.form} >
            <input type="text" value={value} placeholder="Type a message..." onChange={(e) => onchange(e.target.value)} style={ styles.input} />
            <CustomButton type="submit" />
        </form>
    );
}

const styles = {
    form: {
        display: 'flex',
        marginTop: '10px',
    },
    input: {
        flex: 1,
        padding: '0.75rem',
        border: '1px solid #a7f3d0',
        borderRadius: '2rem',
        fontSize: '1rem',
        fontFamily: 'century gothic',
        marginRight: '10px',
        marginBottom: '2rem',
        outline: 'none',
    },
};