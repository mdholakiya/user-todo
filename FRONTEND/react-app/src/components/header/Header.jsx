import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserCircle } from "react-icons/fa";
import "./header.css"
import { Link } from "react-router-dom";


function Header() {
  const [visibleDetails, setvisibleDerails] = useState(false)
  const [showHeader, setshowHeader] = useState(false)

  const token = localStorage.getItem("Token")
  // console.log(token)
  function prevent(e){
    e.preventDefault()
  }

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

  return (
    <>

      <Navbar bg="transperant" className="navi" >
        <Container>
          <Navbar.Brand className="head" as={Link} to="/user/home" href="/user/home">USER TODO</Navbar.Brand>
          <Nav className="me-auto" >
            {/* <Nav.Link as={Link} to="/user/signup" href="/user/signup" >SIGNUP</Nav.Link>
            <Nav.Link  as={Link} to="/user/login" href="/user/login" >LOGIN</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/" href="/">HOME</Nav.Link> */}
            {/* <Nav.Link href="#logout">TODO</Nav.Link>
            <Nav.Link href="#about">LOGOUT</Nav.Link> */}
          </Nav>
{showHeader ?  
<>
            < FaUserCircle className="profile" onSubmit={prevent} onClick={() => {
              setvisibleDerails(!visibleDetails)
            }} />

            {visibleDetails ?
              <div className="profile-popup">
                <Link to="/user/profile" className="profile-link-popup">
                  <li >My Profile</li>
                </Link>
                <Link className="profile-link-popup">
                  <li>Change Password</li>
                </Link>
                <Link className="profile-link-popup" >
                  <li>Logout</li>
                </Link>

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