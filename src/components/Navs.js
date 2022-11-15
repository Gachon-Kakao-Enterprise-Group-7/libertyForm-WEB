import React, { useEffect } from 'react';

//react-bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';


const StyledNavbar = styled(Navbar)`
    background-color : ${props => props.pathname === '/' || props.pathname === '/login' || props.pathname === '/Signin' ? 'rgb(37 37 37 / 5%)' : 'white'};
`


function Navs() {

    const pathname = useLocation().pathname


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
        <StyledNavbar pathname={pathname} collapseOnSelect expand="lg" variant={pathname==='/' || pathname==='/login' || pathname==='/Signin' ? 'dark':'light'} >
            <Container>
                {/* <Logo to = "/"></Logo> */}
                <Navbar.Brand href="/">Libertyform</Navbar.Brand >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse   id="responsive-navbar-nav">
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
                    <Nav >
                        {/*localStorage의 값을 확인해서 존재하면 실행시킴  */}
                        {localStorage.getItem('email') ? <>
                            <NavDropdown styled={{color:'black !important'}} title={`반갑습니다! ${localStorage.getItem('name')}님`} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/null1">Action1</NavDropdown.Item>
                                <NavDropdown.Item href="/null2">Action2</NavDropdown.Item>
                                <NavDropdown.Item href="/null3">Action3</NavDropdown.Item>
                                {localStorage.getItem('email') === 'bwj59@naver.com' &&
                                    <NavDropdown.Item href="/adminpage">관리자 페이지</NavDropdown.Item>
                                }
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