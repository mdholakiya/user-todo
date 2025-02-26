import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/Header.jsx"
import "./home.css"
function Home() {
    return (
        <>
            <Header />
            <Link to="/user/login" className="nextPage"><h1 className="h">Welcome To ToDo App</h1></Link>
        </>
    )
}

export default Home