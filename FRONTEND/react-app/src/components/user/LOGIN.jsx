import React from "react";
import Header from "../header/Header"
function Login() {
    function formSubmit(e) {
        e.preventDefault()
    }
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
                        placeholder="email" />

                    <input className="input"
                        type="password"
                        name="password"
                        id="pass"
                        placeholder="password" />

                    <button className="butn" type="submit" >submit</button>
                </form>


            </div>
        </>
    )
}

export default Login