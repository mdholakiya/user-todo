import React, { useState } from "react";
import Header from "../header/Header"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import "./login.css"
function Login() {
    const [userdata, setCheckuserdata] = useState({
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
        if (!userdata.password || userdata.password.length < 7) {
            setuserErr(true)
        } else {
            setuserErr(false)
        }
        const { name, value } = event.target;
        setCheckuserdata((preValue) => {
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

            const email = e.target.email.value;
            const password = e.target.password.value;
            await axios.post('http://localhost:3000/user/login', { email, password })
                .then((response) => {
                    console.log(userdata); 
                                        console.log(response);
                                        toast.success("user login successfully")
                                        
                                        setTimeout(()=>{
                                            navigate("/toDo/add")
                                            
                                        },4000)
                })
                .catch((error) => { 
                     if(error.status ===400){
                                            toast.error("user not found please enter correct details.")
                                        }
                                        console.log(error)
                                        
            })
    }
}
// Navigate("/toDo/add")


return (
    <>
        <Header />
        <div className="signup">
            <form action="" className="form" onSubmit={formSubmit}>
                <h2>LOGIN</h2>
                <input className="input"
                    type="email"
                    name="email"
                    id="email"
                    Value={userdata.email}
                    onChange={checkdata}
                    placeholder="enter email"
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
                />
                <p className="err">
                    {userErr ? <span className="alertMess">password Is Require</span> : ""}
                </p>


                <button className="butn" type="submit" >submit</button>
                <p className="p">
                    <Link to="/user/signup" className="signupLink">don't have account please signup</Link>
                </p>

            </form>

    <ToastContainer />
        </div>
    </>
)
}

export default Login