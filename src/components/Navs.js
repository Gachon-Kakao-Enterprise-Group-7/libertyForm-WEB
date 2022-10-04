import React from 'react';

//react-bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch  } from 'react-redux';

import Logo from './gayoung_test/Logo';

function Navs() {

    const dispatch = useDispatch()

    return (
        <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
            <Container>
                {/* <Logo to = "/"></Logo> */}
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
                        {/*localStorage의 값을 확인해서 존재하면 실행시킴  */}
                        {localStorage.getItem('id') ? <> 
                            <NavDropdown title={`반갑습니다! ${localStorage.getItem('id')}님`} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/null1">Action1</NavDropdown.Item>
                                <NavDropdown.Item href="/null2">Action2</NavDropdown.Item>
                                <NavDropdown.Item href="/null3">Action3</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/" onClick={()=>{dispatch({type:'LOGOUT'})}}>로그아웃</NavDropdown.Item>
                            </NavDropdown>
                        </> :
                        <>{/*localStorage의 값을 확인해서 로그인이 되어있으면 회원가입이랑 로그인은 안보이게함  */}
                            <Nav.Link href="/Signin">Signin</Nav.Link>
                            <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
                        </>
                        } 
                        
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navs;