// import React from 'react'
// import { Link } from 'react-router-dom'
// export default function Navbar() {
//   return (
//     <div className='Navbar'>
//           <nav>
//               <ul>
//                   <li>
//                       <Link to="/">Home</Link>
//                   </li>
//                   <li>
//                       <Link to="/signup">Signup</Link>
//                   </li>
//                   <li>
//                       <Link to="/signin">Signin</Link>
//                   </li>
//                   <li>
//                       <Link to="/createpost">Create Post</Link>
//                   </li>
//               </ul>
//           </nav>
//     </div>
//   )
// }
import React, { useContext } from "react";

import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function Navbar({ login }) {
    const { setModalOpen } = useContext(LoginContext);
    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return [
                <>
                    {/* <Link to="/">
                        <li>Home</li>
                    </Link> */}
                    <Link style={{ marginLeft: "20px" }} to="/">
                        Home
                    </Link>
                    <Link to="/profile">
                        <li>Profile</li>
                    </Link>
                    <Link to="/createPost">Create Post</Link>
                    
                    <Link to={""}>
                        <button className="primaryBtn" onClick={() => setModalOpen(true)}>
                            Log Out
                        </button>
                    </Link>
                </>,
            ];
        } else {
            return [
                <>
                    <Link to="/signup">
                        <li>SignUp</li>
                    </Link>
                    <Link to="/signin">
                        <li>SignIn</li>
                    </Link>
                </>,
            ];
        }
    };

    return (
        <div className="navbar">
            <img src={""} alt="" />
            <ul className="nav-menu">{loginStatus()}</ul>
        </div>
    );
}