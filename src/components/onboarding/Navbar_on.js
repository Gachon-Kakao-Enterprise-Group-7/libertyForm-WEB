import React, {useState, useEffect} from 'react'
// import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll';

import NavDropdown from 'react-bootstrap/NavDropdown';
export const Nav = styled.nav`
  background: rgb(37 37 37 / 5%);
  height: 60px;
  width :100%;
  margin-top: -60px;
  display:flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top:0;
  z-index:10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`
export const NavLogo = styled(LinkR) `
  color:#fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: -80px;
  font-weight: bold;
  text-decoration: none;
`
export const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`
export const NavMenu = styled.ul`
  display:flex;
  justify-content: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
export const NavItem = styled.li`
  height: 60px;
`
export const NavLinks = styled(LinkR)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #ffcd00
  }
`
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
// export const NavBtnLink = styled(LinkR)`
//   border-radius: 20px;
//   background:  #ffcd00;
//   white-space: nowrap;
//   padding: 7px 15px;
//   margin-top : 15px;
//   color: #fff;
//   font-size: 16px;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   text-decoration: none;

//   &:hover {
//     transition: all 0.2s ease-in-out;
//     background: #fff;
//     color: #010606;
//   }
// `

const NavDropStyle = styled.div`
  padding-top :10px;
  height : 60px;
  .dropdown-button {
    color: #ffcd00;
  }
  .dropdown-color {
    color: #ffcd00;
  }
`

const Navbar_on = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false)
  const toggleHome = () => {
    scroll.scrollToTop();
  }

  // const pathname = useLocation().pathname


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
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/" style={{fontFamily: "Montserrat"}}>LIBERTY FORM</NavLogo>
          {localStorage.getItem('email') ? <>
          <NavDropStyle>
          <NavDropdown styled={{color:'black',paddingTop:'15px'}} title={`반갑습니다! ${localStorage.getItem('name')}님`} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/null1">Action1</NavDropdown.Item>
                                <NavDropdown.Item href="/null2">Action2</NavDropdown.Item>
                                <NavDropdown.Item href="/null3">Action3</NavDropdown.Item>
                                {localStorage.getItem('email') === 'bwj59@naver.com' &&
                                    <NavDropdown.Item href="/adminpage">관리자 페이지</NavDropdown.Item>
                                }
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/" onClick={onLogout}>로그아웃</NavDropdown.Item>
                            </NavDropdown>
                            </NavDropStyle>
                        </> :
                            <>{/*localStorage의 값을 확인해서 로그인이 되어있으면 회원가입이랑 로그인은 안보이게함  */}
                            <NavMenu>
                             <NavItem>
                              <NavLinks to='/login'smooth={true} duration={500} spy={true} exact='true' offset={-60}>로그인</NavLinks>
                            </NavItem>
                            <NavItem>
                              <NavLinks to='/Signin'>회원가입</NavLinks>
                            </NavItem>
                            </NavMenu>
                            </>
                        }
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar_on