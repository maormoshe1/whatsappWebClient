import { useRef, useState, useEffect } from 'react';
import './Login.css';
import { useHistory } from "react-router-dom"
import users from '../hard_coded/users'
import { wait } from '@testing-library/user-event/dist/utils';


function Login() {
	const username = useRef(null);
	const password = useRef(null);
	const usernameR = useRef(null);
	const passwordR = useRef(null);
	const password2R = useRef(null);
	const displayName = useRef(null);
	let history = useHistory();


	// const handleLogin = () => {
	// 	fetch ('https://localhost:7132/api/Users',{
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({username: username.current.value, password: password.current.value})
    //         }).then(res => {
    //             if(res.ok){ 
	// 				localStorage.setItem('token', 'this is the token')
	// 				history.push("/chat_page")
	// 				return;                
    //             }
    //             else {
	// 				document.getElementById('alert').style.visibility = "collapse";
	// 				document.getElementById('alert').innerHTML = "Incorrect username and / or password";
	// 				document.getElementById('alert').style.visibility = "visible";
    //             }
    //         })  
	// }

	// const handleRegister =() => {
	// 	if (passwordR.current.value != password2R.current.value) {
	// 		document.getElementById('alert').style.visibility = "collapse";
	// 		document.getElementById('alert').innerHTML = "The passwords do not match:(";
	// 		document.getElementById('alert').style.visibility = "visible";

	// 		document.getElementById("passwordR").value = "";
	// 		document.getElementById("password2R").value = "";
	// 		return;
	// 	}

	// 	var passw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}/;
	// 	if(!passwordR.current.value.match(passw)) {
	// 		document.getElementById('alert').style.visibility = "collapse";
	// 		document.getElementById('alert').innerHTML = "Password need to contain at least one numeric digit, one uppercase and one lowercase letter";
	// 		document.getElementById('alert').style.visibility = "visible";	
	// 		return;
	// 	}

	// 	if (usernameR.current.value == "" || passwordR.current.value == "" || password2R.current.value == "" ||displayName.current.value == "" ) {
	// 		document.getElementById('alert').style.visibility = "collapse";
	// 		document.getElementById('alert').innerHTML = "Something is missing";
	// 		document.getElementById('alert').style.visibility = "visible";	
	// 		return;
	// 	}

	// 	//users.push({ uname: usernameR.current.value, dname: displayName.current.value, password: passwordR.current.value, contacts: [] })
	// 	//localStorage.setItem('userName',usernameR.current.value)
	// 	//history.push("/chat_page")

	// 	fetch ('https://localhost:7132/api/Users',{
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({username: username.current.value, password: password.current.value, displayName: displayName.current.value})
    //         }).then(res => {
    //             if(res.ok){ 
	// 				localStorage.setItem('token', 'this is the token')
	// 				history.push("/chat_page")
	// 				return;                
    //             }
    //             else {
	// 				document.getElementById('alert').style.visibility = "collapse";
	// 				document.getElementById('alert').innerHTML = "This username is taken, try another one:)";
	// 				document.getElementById('alert').style.visibility = "visible";
	
	// 				document.getElementById("usernameR").value = "";
	// 				document.getElementById("passwordR").value = "";
	// 				document.getElementById("password2R").value = "";
	// 				return;		
    //             }
    //         }) 		
	// }

	const handleSwitchToLogin = () => {
		closeAlert();
		document.getElementById("registerCan").style.visibility = "collapse";

		var divRegisterCanvas = document.getElementById("registerCan");
		document.getElementById("LoginCan").style.left = "0%";
		var intervalID = window.setInterval(myCallback, 10);
		var startLeft = 40;
		function myCallback() {
			if (startLeft == 30) {
				document.getElementById("ChangeToLoginCan").style.visibility = "collapse";
				document.getElementById("ChangeToRegisterCan").style.visibility = "visible";
			}
			if (startLeft > 0) {
				startLeft -= 2;
				divRegisterCanvas.style.left = startLeft.toString() + "%";
			}
			else {
				document.getElementById("registerCan").style.visibility = "collapse";
				document.querySelector("#registerCan > button.btn-grad").style.display = "none";
				document.getElementById("LoginCan").style.visibility = "visible";
				clearInterval(intervalID);
			}
		}
	}

	const handleSwitchToRegister = () => {
		closeAlert();
		var divRegisterCanvas = document.getElementById("LoginCan");
		document.getElementById("registerCan").style.left = "40%";
		var intervalID = window.setInterval(myCallback, 10);
		var startLeft = 0;
		function myCallback() {
			if (startLeft == 10) {
				document.getElementById("ChangeToRegisterCan").style.visibility = "collapse";
				document.getElementById("ChangeToLoginCan").style.visibility = "visible";
			}
			if (startLeft < 40) {
				startLeft += 2;
				divRegisterCanvas.style.left = startLeft.toString() + "%";
			}
			else {
				document.getElementById("LoginCan").style.visibility = "collapse";
				document.querySelector("#registerCan > button.btn-grad").style.display = "inline-block";
				document.getElementById("registerCan").style.visibility = "visible";
				clearInterval(intervalID);
			}
		}
	}

	const handleLogin = (uname, password) => {
		for (let user of users) {
			if (user.uname == uname.current.value && user.password == password.current.value) {
				localStorage.setItem('userName',uname.current.value)
				history.push("/chat_page")

				return;
			}
		}

		document.getElementById('alert').style.visibility = "collapse";
		document.getElementById('alert').innerHTML = "Incorrect username and / or password";
		document.getElementById('alert').style.visibility = "visible";
	}


	const handleRegister = (usernameR, passwordR, password2R, displayName) => {
		for (let user of users) {
			if (user.uname == usernameR.current.value) {
				document.getElementById('alert').style.visibility = "collapse";
				document.getElementById('alert').innerHTML = "This username is taken, try another one:)";
				document.getElementById('alert').style.visibility = "visible";

				document.getElementById("usernameR").value = "";
				document.getElementById("passwordR").value = "";
				document.getElementById("password2R").value = "";
				return;
			}

		}
		if (passwordR.current.value != password2R.current.value) {
			document.getElementById('alert').style.visibility = "collapse";
			document.getElementById('alert').innerHTML = "The passwords do not match:(";
			document.getElementById('alert').style.visibility = "visible";

			document.getElementById("passwordR").value = "";
			document.getElementById("password2R").value = "";
			return;
		}

		var passw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}/;
		if(!passwordR.current.value.match(passw)) {
			document.getElementById('alert').style.visibility = "collapse";
			document.getElementById('alert').innerHTML = "Password need to contain at least one numeric digit, one uppercase and one lowercase letter";
			document.getElementById('alert').style.visibility = "visible";	
			return
		}

		if (usernameR.current.value == "" || passwordR.current.value == "" || displayName.current.value == "") {
			document.getElementById('alert').style.visibility = "collapse";
			document.getElementById('alert').innerHTML = "Something is missing";
			document.getElementById('alert').style.visibility = "visible";	
			return
		}

		users.push({ uname: usernameR.current.value, dname: displayName.current.value, password: passwordR.current.value, contacts: [] })
		localStorage.setItem('userName',usernameR.current.value)
		history.push("/chat_page")

	}

	const closeAlert = function() {
		document.getElementById('alert').style.visibility = "collapse";
	}


	return (
		<div>
			<img className='background' src="Images/registerBackground.png" />
			<img className='mainCanvas' src="Images/switchBackground.jpg" />
			<div className="mainCanvas">
				<div id='LoginCan' className='LoginCanvas'>
					<h1 className='text2'>Sign In</h1>
					<br />
					<input onClick={() => { closeAlert() }} ref={username} className='input' type="uname" placeholder='Username' required />
					<br /><br />
					<input onClick={() => { closeAlert() }} ref={password} className='input' type="password" placeholder='Password' required />

					<button  onClick={() => { handleLogin(username, password) }} className='btn-grad'>Login</button>

				</div>


				<div id='ChangeToRegisterCan' className='ChangeToRegisterCanvas'>
					<h1 className='textSwitch'>New Here?</h1>
					<br />
					<em className='textSwitch3'>Enter your personal details and let's get started!</em>
					<br />
					<button onClick={() => { handleSwitchToRegister() }} className='loginBtn'>Sign Up</button>
				</div>


				<div id='registerCan' className='RegisterCanvas'>
					<h1 className='text'>Registration</h1>
					<br />
					<input onClick={() => { closeAlert() }} ref={usernameR} className='input' id="usernameR" placeholder='Username' required />
					<br /><br />
					<input onClick={() => { closeAlert() }} ref={passwordR} className='input' id="passwordR" type="password" placeholder='Password' required />
					<br /><br />
					<input onClick={() => { closeAlert() }} ref={password2R} className='input' id="password2R" type="password" placeholder='Re-enter password' required />
					<br /><br />
					<input onClick={() => { closeAlert() }} ref={displayName} className='input' id="displayName" placeholder='Display name' required />

					<button onClick={() => { handleRegister(usernameR, passwordR, password2R, displayName) }} className='btn-grad'>Sign Up</button>
				</div>
				<div id='ChangeToLoginCan' className='ChangeToLoginCanvas'>
					<h1 className='textSwitch'>Welcome Back!</h1>
					<br />
					<em className='textSwitch2'>already have an acount?</em>
					<br />
					<button id='hey' onClick={() => { handleSwitchToLogin() }} className='loginBtn'>Sign In</button>
				</div>
				<div className="alert alert-warning" role="alert" id='alert'/>

			</div>
		</div>
	);
}

export default Login;
