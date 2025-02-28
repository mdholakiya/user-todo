import React, { useState } from "react"
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import Header from "../header/Header"
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import "./signup.css"

function Signup() {
    const [userDetails, setuserDetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [userErr, setuserErr] = useState(false)
    const [showPassword, setshowPassword] = useState(false)
    const navigate = useNavigate();

    const inputChange = (event) => {
        const { name, value } = event.target;
        setuserDetails((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })

    }

    async function submitForm(e) {
        
        e.preventDefault()
        if (!userDetails.name || !userDetails.email || !userDetails.password || !userDetails.confirmPassword || userDetails.confirmPassword !== userDetails.password ||userDetails.password.length<7) {
            setuserErr(true)
            // error.response="all fields are require"
        }
        // if (!userDetails.name) {
        //     setuserErr(true)
        //     // error.name="user name is require"
        // }
        // else if (!userDetails.email) {
        //     setuserErr(true)
        //     // error.email="email is require"
        // }
        // else if (!userDetails.password) {
        //     setuserErr(true)
        //     // error.password="password is require"
        // }
        // else if (!userDetails.confirmPassword) {
        //     setuserErr(true)
        //     //  error.password="confirm-password is require"
        // }
        // else if (userDetails.confirmPassword !== userDetails.password ) {
        //     setuserErr(true)
        //     // error.password=" password should match with confirm-password "
        // }
        else {
            setuserErr(false)
            setshowPassword(false)
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPass= e.target.confirmPassword.value;
            await axios.post('http://localhost:3000/user/signup', { name, email, password,confirmPass })

                .then(response => {
                    console.log(userDetails,"signup");
                    console.log(response,"signup");
                    toast.success("user created successfully")

                    setTimeout(() => {
                        navigate("/user/login")

                    }, 1000)
                })
                .catch(error => {
                    if (error.status === 403) {
                        toast.error("user already exist try to login")
                    }
                    console.log(error)

                })
               

        }
    }

    return (
        <>
            <Header />
            <div className="signup">
                <form action="" className="form" onSubmit={submitForm} >
                    <h2>SIGNUP</h2>

                    <input className="input"
                        name="name"
                        type="text"
                        placeholder="user name"
                        value={userDetails.name}
                        onChange={inputChange}
                        required />
                    <p className="err">
                        {userErr && <span className="alertMess">username is require</span> }
                    </p>

                    <input className="input"
                        name="email"
                        type="email"
                        id="email"
                        placeholder="email"
                        value={userDetails.email}
                        onChange={inputChange} 
                        required/>
                    <p className="err">
                        {userErr && <span className="alertMess">Email Is Require</span> }
                    </p>

                    <div className="main">
                        {
                            showPassword ?
                                <BiSolidHide className="login-pass-icon" onClick={() => {
                                    setshowPassword(false) 
                                }} />:
                                    <BiSolidShow className="login-pass-icon" onClick={() => {
                                        setshowPassword(true)
                                }} />
                        }
                        <input className="input"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            id="pass"
                            placeholder="password"
                            value={userDetails.password}
                            onChange={inputChange}
                            required
                        />
                    </div>
                    <p className="err">
                        {userErr && <span className="alertMess"> Password Is Require min length:8 ex:Abcd1234</span> }
                    </p>

                        
                    <input className="input"
                        name="confirmPassword"
                        type="password"
                        id="confirm-pass"
                        placeholder="confirm password"
                        onChange={inputChange}
                        value={userDetails.confirmPassword}
                        required
                    />
                    <p className="err">
                        {userErr && <span className="alertMess">enter correct password</span>}
                    </p>

                    <button className="butn"
                        type="submit">submit</button>

                    <Link to="/user/login" className="loginLink">already have an account? try to login</Link>

                </form>
                <ToastContainer />
            </div>

        </>
    )
}

export default Signup