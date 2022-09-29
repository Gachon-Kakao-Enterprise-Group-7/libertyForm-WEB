import React from 'react';

//react-bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Navs() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Libertyform</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/null1">null</Nav.Link>
                        <Nav.Link href="/null2">null</Nav.Link>
                        <NavDropdown title="null" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/null1">Action1</NavDropdown.Item>
                            <NavDropdown.Item href="/null2">Action2</NavDropdown.Item>
                            <NavDropdown.Item href="/null3">Action3</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/Signin">Signin</Nav.Link>
                        <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navs;