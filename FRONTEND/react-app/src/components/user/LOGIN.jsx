import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios"
import { loginUserRoute } from "../../api/user";
import "./login.css"

function Login() {
    const [userdata, setuserdata]= useState({
        email: "",
        password: ""
    })
    const [userErr, setuserErr] = useState(false)
    // const [showPassword,setshowPassword]=useState(false)
    const navigate=useNavigate()
    function checkdata(event) {
        if (!userdata.email) {
            setuserErr(true)
        }
        if (!userdata.password || userdata.password.length <7) {
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
        }
        else {
            setuserErr(false)
            const email = e.target.email.value;
            const password = e.target.password.value;
            await loginUserRoute({email, password})
                .then((response) => {
                    console.log(userdata,"lohin data"); 
                    console.log(response,"login");
                    // console.log(response.data.token,"token")

                    localStorage.setItem("Token", response.data.token)
                    localStorage.setItem("Username",response.data.user.name)
                    localStorage.setItem("Email", response.data.user.email)
                    toast.success("user login successfully",{
                        autoClose:500
                    })
                      navigate("/toDo/add")
                        
                })
                .catch((error) => { 
                     if(error.status ===400 || error.status===403 ||  error.status===404 ){
                                            toast.error(error.response.data.message)
                                        }
                                        console.log(error)
                                        
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
                    required
                />
                <p className="err">
                    {userErr ? <span className="alertMess">Email Is Require</span> : ""}
                </p>

                <input className="input"
                    type="password"
                    name="password"
                    id="pass"
                    onChange={checkdata}
                    value={userdata.password}
                    placeholder=" enter password"
                    required
                />
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