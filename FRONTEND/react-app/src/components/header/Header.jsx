import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter , Route, Routes, Link ,Navigate} from "react-router-dom";
function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="transperant" className="navi">
        <Container>
          <Navbar.Brand className="head" as={Link} to="/user" href="/user">USER TODO</Navbar.Brand>
          <Nav className="me-auto" >
            <Nav.Link as={Link} to="/user/signup" href="/user/signup" >SIGNUP</Nav.Link>
            <Nav.Link  as={Link} to="/user/login" href="/user/login" >LOGIN</Nav.Link>
            {/* <Nav.Link as={Link} to="/" href="/">HOME</Nav.Link> */}
            {/* <Nav.Link href="#logout">TODO</Nav.Link>
            <Nav.Link href="#about">LOGOUT</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;