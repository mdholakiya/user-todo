import React from "react";
import "./notFound.css"
import { BrowserRouter , Route, Routes, Link,NavLink } from "react-router-dom";
function Page404(){
    function changePage(e){
        e.preventDefault()
    }
    return(
        <>
            <h1 className="notfound">Page Not Found </h1>
            <ul>
                <li onClick={changePage}> <NavLink  className="change"  to="/">Go To Home Page </NavLink></li>
            </ul>
        </>
    )
}

export default Page404