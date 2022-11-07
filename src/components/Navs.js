import React from 'react';

//react-bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';


const StyledNavbar = styled(Navbar)`
    background-color: rgb(37 37 37 / 5%);
`

function Navs() {

    const dispatch = useDispatch()

    const onLogout = () => {
        // sessionStorage 에 email 로 저장되어있는 아이템을 삭제한다.
        localStorage.removeItem('email')
        localStorage.removeItem('jwt')
        localStorage.removeItem('name')
        localStorage.removeItem('token')

        // App 으로 이동(새로고침)
        document.location.href = '/'
    }

    return (
        <StyledNavbar collapseOnSelect expand="lg" variant="dark" >
            <Container>
                {/* <Logo to = "/"></Logo> */}
                <Navbar.Brand href="/">Libertyform</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Dashboard_prev">test</Nav.Link>
                        <Nav.Link href="/SideBar">Sidebar</Nav.Link>
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
                        {localStorage.getItem('email') ? <>
                            <NavDropdown title={`반갑습니다! ${localStorage.getItem('name')}님`} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/null1">Action1</NavDropdown.Item>
                                <NavDropdown.Item href="/null2">Action2</NavDropdown.Item>
                                <NavDropdown.Item href="/null3">Action3</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/" onClick={onLogout}>로그아웃</NavDropdown.Item>
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
        </StyledNavbar>
    );
}

export default Navs;