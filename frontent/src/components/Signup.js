import React from 'react'
import { useState } from 'react'
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Signup.css"
// export default function Signup() {
//     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
//     const [username, setUsername] = useState("")
//     const [email,setEmail] = useState("")
//     const [password,setPassword]= useState("")
//     const navigate = useNavigate()
//     //create a toast function 

//     const notifyError=(msg)=>{
//         toast.error(msg)
//     }

//     const postData = () => {
//         if(emailRegex.test(email)){
//             notifyError("enter valid email")
//             return ;
//         }
//         fetch('/signup',{
//             method:"post",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 username:username,
//                 email:email,
//                 password:password
//             })
//         }).then((res)=>res.json()).then(data=>{
//             if(data.error){
//                 // notifyError(data.error)
//                 return notifyError(data.error)
               
//             }
//             else{
//                 navigate("/signin")
//             }
//         })
//     }
//     return (
        
//         <div>
//             <div className='Signup'>
//                 <form className='form'>
//                     <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
//                     <input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//                     <input type='text' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
//                     <button className='btn' style={{ backgroundColor: 'blue' }} onClick={postData}>submit</button>
//                 </form>
                
//             </div>
//         </div>
//     )
// }

// import React, { useEffect, useState } from "react";
// // import logo from "../img/logo.png";
// import "./Signup.css";
// import { Link, useNavigate } from "react-router-dom";

// import { toast } from 'react-toastify';


export default function Signup() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    // Toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    

    const postData = () => {
        //checking email
        // if (!emailRegex.test(email)) {
        //     notifyA("Invalid email")
        //     return
        // } else if (!passRegex.test(password)) {
        //     notifyA("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
        //     return
        // }

        // Sending data to server
        fetch("http://localhost:5000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password

            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    notifyA(data.error)
                } else {
                    notifyB(data.message)
                    navigate("/signin")
                }
                console.log(data)
            })
    }

    return (
        <div className="signUp">
            <div className="form-container">
                <div className="form">
                    {/* <img className="signUpLogo" src={logo} alt="" /> */}
                    <p className="loginPara">
                        Sign up to see photos and videos <br /> from your friends
                    </p>
                    <div>
                        <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <p
                            className="loginPara"
                            style={{ fontSize: "12px", margin: "3px 0px" }}
                        >
                            By signing up, you agree to out Terms, <br /> privacy policy and
                            cookies policy.
                        </p>
                        <input type="submit" id="submit-btn" value="Sign Up" onClick={() => { postData() }} />
                    </div>
                    
                    
                </div>
                <div className="form2">
                    Already have an account ?
                    <Link to="/signin">
                        <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}