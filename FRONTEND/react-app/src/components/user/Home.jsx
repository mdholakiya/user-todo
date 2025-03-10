import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css"
function Home() {
    const Token = localStorage.getItem("Token")
    const navigate = useNavigate();

    return (
        <>
            <div className="nextPage" onClick={() => { Token ? null : navigate('/user/login')}}><h1 className="h">Welcome To ToDo App
                </h1 ></div >
        </>
    )
}

export default Home