import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './button';
import { loginUtils } from '../utils/api';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
	const navigate = useNavigate();
	// using useRef
	// const textRef = useRef();

	// let time = 1

	// useEffect(()=>{
	// 	console.log("Login Component has mount on the page");

	// 	const id_interval = setInterval(()=>{
	// 		console.log('Timer Running' + time)
	// 		time++;
	// 	},2000);

	// 	return ()=>{
	// 		// here u write code for unmounting
	// 		// alert("Cleaning up any memory usage before unmounting this component");
	// 		clearInterval(id_interval);
	// 		console.log("Cleared Interval before leaving the page");
	// 	}
	// }, [])	

	// useEffect(()=>{
	// 	console.log("LOGIN Component has updated");
	// 	if(textRef.current){
	// 		const password_field= textRef.current;
	// 		password_field.style.background="green";
	// 		console.log(password_field)
	// 	}
	// 	},[email,password]) 

	function updateEmail(event){
		setEmail(event.target.value);
	}
    
	async function submitForm(event){
		event.preventDefault();

		// validate b4 submitting 
		if(!password || !email){
			// show error message or use alert to show error message 
			setError('One or more of your required field is empty');
			return 
		}
		if(!email.endsWith(".com") && !email.endsWith(".org")){
			// show error message or use alert to show error message 
			setError('This does not follow a valid email pattern');
			return 
		}
		if(password.length < 8){
			// show error message or use alert to show error message 
			setError('password length must be greater than 8');
			return 
		} 
        // API Response from server
		const response = await loginUtils(email,password);
		if(response.success){
			alert("Login successfull");
			sessionStorage.setItem("chat-app-user", email);
			// redirect to chat app 
			navigate("/Chat")
			return ;
		} else{
			setError(response.message);
			return ;
		}
	}

    return (
        <div>
            <h2> Login </h2>
			<div>
				<p>{error}</p>
			</div>
            <form className='contact' >
                <label>Email</label>
                <input type="email" name="email" value={email} onInput={updateEmail}/>
                <label>Password</label>
                <input type="password" name="password" value={password} onInput={(event)=>setPassword(event.target.value)}  />
                
                <Button text="Login" onClick={submitForm} />

				<div style={{ margin: 'auto' }}>
					Don't have an account? <Link to="/signup">Signup</Link>
				</div>
            </form>
            
        </div>
    )
}

// ref={textRef} useEffect, useRef

// This codeblock was written when there was no backend for cross validation 
// if(registeredUser && email === registeredUser.email && password === registeredUser.password1) {
        //     alert("Login Successful .....");
        // } else {
		// 	alert('Invalid Credentials.');
        // }