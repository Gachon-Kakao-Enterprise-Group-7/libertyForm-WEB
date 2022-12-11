import React, {useState} from 'react'
import styled from 'styled-components'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

export const NavS = styled(Navbar)`
  background: rgb(37 37 37 / 5%);
  height: 60px;
  width: 100%;
  margin-top: -60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

const Navbar_on = () => {
  const onLogout = () => {
    // sessionStorage 에 email 로 저장되어있는 아이템을 삭제한다.
    localStorage.removeItem("email");
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    localStorage.removeItem("token");

    // App 으로 이동(새로고침)
    document.location.href = "/";
  };

  return (
    <>
      <NavS variant="dark">
        <Container>
          <Navbar.Brand href="/" style={{ fontFamily: "Montserrat" }}>
            LIBERTY FORM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {/*localStorage의 값을 확인해서 존재하면 실행시킴  */}
              {localStorage.getItem("email") ? (
                <>
                  <NavDropdown
                    styled={{ color: "black !important" }}
                    title={`반갑습니다! ${localStorage.getItem("name")}님`}
                    id="collasible-nav-dropdown"
                  >
                    {localStorage.getItem("email") === "bwj59@naver.com" && (
                      <>
                        <NavDropdown.Item href="/adminpage">
                          관리자 페이지
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                      </>
                    )}

                    <NavDropdown.Item href="/" onClick={onLogout}>
                      로그아웃
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  {/*localStorage의 값을 확인해서 로그인이 되어있으면 회원가입이랑 로그인은 안보이게함  */}
                  <Nav.Link eventKey={2} href="/login">
                    로그인
                  </Nav.Link>
                  <Nav.Link href="/Signin">회원가입</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </NavS>
    </>
  );
};

export default Navbar_on;
