import React from "react";
import { Link } from "react-router-dom";
import "./home.css"
function Home() {
    return (
        <>
           
            <Link to="/user/login" className="nextPage"><h1 className="h">Welcome To ToDo App</h1></Link>
        </>
    )
}

export default Home