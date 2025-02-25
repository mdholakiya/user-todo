import React, { useEffect, useState } from "react"
import Header from "../header/Header"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./signup.css"

function Signup() {
    const [userDetails, setuserDetails] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [userErr, setuserErr] = useState(false)
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
        console.log(userDetails);
        try {
            if (!userDetails.name || !userDetails.email || !userDetails.password) {
                console.log("all field require")
                setuserErr(true)
            }
            else {
                setuserErr(false)
            }

            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            await axios.post('http://localhost:3000/user/signup', { name, email, password })
                .then(response => {
                    console.log(response)
                    navigate("/user/login")
                })
                .catch(error => {
                    console.log(error)
                })

        } catch (error) {
            console.log(error.message)
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
                        onChange={inputChange} />
                    {userErr ? <span className="alertMess"> UserName Is Require</span> : ""}

                    <input className="input"
                        name="email"
                        type="email"
                        id="email"
                        placeholder="email"
                        value={userDetails.email}
                        onChange={inputChange} />
                    {userErr ? <span className="alertMess">Email Is Require</span> : ""}

                    <input className="input"
                        name="password"
                        type="password"
                        id="pass"
                        placeholder="password"
                        value={userDetails.password}
                        onChange={inputChange}
                    />
                    {userErr ? <span className="alertMess"> Password Is Require ex:Abcd1234</span> : ""}

                    <button className="butn"
                        type="submit">submit</button>
                </form>
            </div>

        </>
    )
}
export default Signup