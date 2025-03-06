import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserCircle } from "react-icons/fa";
import "./header.css"
// import { Link } from "react-router-dom";


function Header() {
  const [visibleDetails, setvisibleDerails] = useState(false)
  const [showHeader, setshowHeader] = useState(false)

  const navigate = useNavigate()
  const token = localStorage.getItem("Token")
  // console.log(token)
  // function prevent(e) {
  //   e.preventDefault()
  //   // setvisibleDerails(!visibleDetails)
  // }

  function handleProfile() {
    if (token) {
      setshowHeader(true)
    }
    else {
      setshowHeader(false)
    }
  }

  useEffect(() => {
    handleProfile()
  })

  const logout = () => {
    localStorage.clear()
    navigate("/")
    
  }

  const myProfile = () => {
    navigate("/user/profile")
  }
  const myTodo = () => {
    navigate("/toDo/add")
  }
  return (
    <>

      <Navbar bg="transperant" className="navi" >
        <Container>
          <Navbar.Brand className="head" as={Link} to="/user/home" href="/user/home">USER TODO</Navbar.Brand>
          <Nav className="me-auto" >
          </Nav>
          {showHeader ?
            <>
              < FaUserCircle className="profile"
                onClick={() => {

                  setvisibleDerails(!visibleDetails)
                }}
              />

              {visibleDetails ?
                <div className="profile-popup">

                  <div className="profile-link-popup">
                    <li onClick={myProfile}>My Profile</li>
                  </div>

                  <div className="profile-link-popup">
                    <li>Change Password</li>
                  </div>

                  <div className="profile-link-popup">
                    <li onClick={myTodo}>Todo Items</li>
                  </div>

                  <div className="profile-link-popup">
                    <li onClick={logout}>Logout</li>
                  </div>

                </div>

                : null}
            </>
            : null}


        </Container>
      </Navbar>
    </>
  );



}

export default Header;