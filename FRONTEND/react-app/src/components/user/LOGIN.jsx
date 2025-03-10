import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
// import axios from "axios"
import { loginUserRoute } from "../../api/user";
import "./login.css"

function Login() {
    const [userdata, setuserdata] = useState({
        email: "",
        password: ""
    })
    const [userErr, setuserErr] = useState(false)
    const [showPassword, setshowPassword] = useState(false)

    const navigate = useNavigate()
    function checkdata(event) {
        if (!userdata.email) {
            setuserErr(true)
        }
        if (!userdata.password || userdata.password.length < 7) {
            setuserErr(true)
        } else {
            setuserErr(false)
        }
        const { name, value } = event.target;
        setuserdata((preValue) => {
            return {
                ...preValue,
                [name]: value
            }

        })

    }

    async function formSubmit(e) {
        e.preventDefault()
        
        if (!userdata.email || !userdata.password) {
            setuserErr(true)
            // console.log(email,"fffffffff")
            // console.log(password,"dddddddddddddddddddd")
        }
        else {
            setuserErr(false)
            const email = e.target.email.value;
            const password = e.target.password.value;
            await loginUserRoute({ email, password })
                .then((response) => {
                    console.log(userdata, "login data");
                    console.log(response, "login------------");

                    localStorage.setItem("Token", response.data.token)
                    localStorage.setItem("Email", response.data.user.email)
                    localStorage.setItem("name", response.data.user.name)
                    localStorage.setItem("password", response.data.user.password)
                    // if (response.status === 200) {
                        toast.success(response.data.message, {
                            autoClose: 500
                        })
                        navigate("/todo/add")
                    // }
                    // if ( response.status === 403) {
                    //     toast.error(response.data.message)
                    // }
                   
                })
                .catch((error) => {
                    if (error.status === 500  || error.status === 403 ) {
                 toast.error(error.response.data.message)
                    }
                    if (error.status === 400) {
                
                        toast.error(error.response.data.err[0].msg)
                    }


                })
        }
    }


    return (
        <>
            <div className="login">
                <form action="" className="form" onSubmit={formSubmit}>
                    <h2>LOGIN</h2>
                    <input className="input"
                        type="email"
                        name="email"
                        id="email"
                        value={userdata.email}
                        onChange={checkdata}
                        placeholder="enter email"
                    // required
                    />
                    <p className="err">
                        {userErr ? <span className="alertMess">Email Is Require</span> : ""}
                    </p>

                    <div>
                        {
                            showPassword ?
                                <BiSolidShow className="login-pass-icon" onClick={() => {
                                    setshowPassword(false)
                                }} /> :
                                <BiSolidHide className="login-pass-icon" onClick={() => {
                                    setshowPassword(true)
                                }} />

                        }
                        <input className="input"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="pass"
                            value={userdata.password}
                            onChange={checkdata}
                            placeholder=" enter password"
                        // required
                        />
                    </div>
                    <p className="err">
                        {userErr ? <span className="alertMess">password Is Require. min-Length:8</span> : ""}
                    </p>


                    <button className="butn" type="submit" >submit</button>
                    <p className="p">
                        <Link to="/user/signup" className="signupLink">don't have account please signup</Link>
                    </p>

                </form>
            </div>
        </>
    )
}

export default Login