import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { LoginContext } from "../context/LoginContext";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Signin.css"

export default function Signin() {
    const  {setUserLogin}  = useContext(LoginContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    //create a toast 

    const toastError=(msg)=>{
        toast.error(msg)
    }
    const postData=()=>{
        fetch('http://localhost:5000/signin',{
            method:"post",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then((res)=>res.json()).then((data)=>{
            if(data.error){
                toastError(data.error);
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))

                setUserLogin(true)
                navigate('/')

            }
        })
    }
    return (
        // <div>
        //     <div className='Signin'>
        //         <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        //         <input type='text' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        //         <button className='btn' style={{backgroundColor:'blue'}} onClick={postData}>signin</button>
        //     </div>
        // </div>
        <div className="signIn">
            <div>
                <div className="loginForm">
                    {/* <img className="signUpLogo" src={logo} alt="" /> */}
                    <div>
                        <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
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
                    </div>
                    <input type="submit" id="login-btn" onClick={() => { postData() }} value="Sign In" />
                </div>
                <div className="loginForm2">
                    Don't have an account ?
                    <Link to="/signup">
                        <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
