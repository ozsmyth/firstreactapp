// import axios from 'axios'

// const API_URL = "localhost:4000/api";

// export async function signupUtils(email, password) {
// 	try {
// 		const response = await axios.post(`${API_URL}/auth/signup`, {
// 			"username" : email,
// 			'password' : password
// 		})
// 		// message : error.message, success
// 		console.log(response)
// 		return{
// 			success : response.success,
// 			message : response.message
// 		}
// 	} catch (error) {
// 		console.log(error)
// 		return{
// 			success : false,
// 			message : error.message
// 		}
// 	}
// }

import axios from 'axios'

const API_URL = 'http://192.168.43.26:4000/api';//process.env.REACT_APP_API_URL;
console.log(API_URL);

export async function signupUtils(email, password) {
	try {
		const response = await axios.post(`${API_URL}/auth/signup`, {
			"username": email,
			'password': password
		})
		// message : error.message, success  
		console.log(response)
		return {
			success: response.data.success,
			message: response.data.message
		}
	} catch (error) {
		console.log(error)
		return {
			message: error?.response?.data?.message ||  error.message,
			success: false
		}
	}
}

export async function loginUtils(email, password) {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, {
			username: email,
			password: password,
		});
		const { token } = response.data;
		localStorage.setItem('token', token);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		console.log(axios)
		return { success: true, message : 'login successful' };
	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || 'Login failed'
		};
	}
};

export function logoutUtils(){
	localStorage.removeItem("token");
}