import React from 'react';

export default function Button({ text, onClick }) {
	function onHover(event) {
		//change the text
		const button = event.target;
		button.innerText = 'Done';
	}
	function unHover(event) {
		const button = event.target;
		button.innerText = text;
	}
	return (
		<div>
			<button type='submit' className='submitButton' onClick={onClick} onMouseEnter={onHover} onMouseLeave={unHover}>{text}</button>
		</div>
	);
}

export function CustomButton() {
	return (
		<div>
			<button type='submit' className='button'>Send</button>
		</div>
	);
}
