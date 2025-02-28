import React, { useState } from "react"
import "./profile.css"
import Headers from "../header/Header"
// import Login from "../user/Login"
import axios from "axios"
// import Signup from "../user/Signup"


// console.log(localStorage.getItem("Token"))
// console.log(localStorage.getItem("Username"))
// console.log(localStorage.getItem("Email"))
function Profile() {
    const [changeData, setchangeData] = useState(true);
    const[closeUser,setcloseUser]=useState(true);
    const[userEmail,setuserEmail]=useState(localStorage.getItem("Email"))
    const[userName,setuserName]=useState(localStorage.getItem("Username"))

    // const updateData = async (e) => {
    //     e.preventDefault()
    // }

    function changetext() {
        setchangeData(!changeData)
    }
    function deleteUser(){
        setcloseUser(!closeUser)

    }

    return (
        <>
            <Headers />
            <h1 className="info">Details</h1>

            <div className="details">

                <input type="text"
                    name="name"
                    id="name"
                    value={userName}
                    // readOnly
                />
                <input type="email"
                    name="email"
                    id="email"
                    value={userEmail}
                    // onChange={(e)=>{e.target.value}}
                    // readOnly

                />
                {
                    changeData ? <button onClick={changetext} className="changeData">update</button> : <button onClick={changetext} className="changeData">add</button>
                }

                {
                    closeUser ? <button onClick={deleteUser} className="changeData">delete account</button> : <button onClick={deleteUser} className="changeData">done</button>
                }
                
            </div>

        </>
    )
}
export default Profile