import React from 'react';

//react-bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';


const StyledNavbar = styled(Navbar)`
    background-color : ${props => props.pathname === '/' || props.pathname === '/login' || props.pathname === '/Signin' || props.pathname === '/kakaologin' ? 'rgb(37 37 37 / 5%)' : 'white'};
    height: 60px;
    width :100%;
    display:flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1rem;
    position: sticky;
`

export const NavLogo = styled(Navbar.Brand)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: -80px;
  font-weight: bold;
  text-decoration: none;
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
        <StyledNavbar pathname={pathname} collapseOnSelect expand="lg" variant={pathname === '/' || pathname === '/login' || pathname === '/Signin' ? 'dark' : 'light'} >
            <Container>
                {/* <Logo to = "/"></Logo> */}
                <Navbar.Brand href="/" style={{ fontFamily: "Montserrat" }}>LIBERTY FORM</Navbar.Brand >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav >
                        {/*localStorage의 값을 확인해서 존재하면 실행시킴  */}
                        {localStorage.getItem('email') ? <>
                            <NavDropdown styled={{ color: 'black !important' }} title={`반갑습니다! ${localStorage.getItem('name')}님`} id="collasible-nav-dropdown">
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
                                <Nav.Link eventKey={2} href="/login">로그인</Nav.Link>
                                <Nav.Link href="/Signin" >회원가입</Nav.Link>
                            </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </StyledNavbar>
    );
}

export default Navs;