import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const active = 'nav-item-active';


const NavItem = styled(NavLink).attrs({
    active
}) `
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 14px;
  letter-spacing: 0.1px;
  border-left: 3px solid #fff;
  svg {
    fill: #92929d; 
  }
  &.${active} { //작동 안되는거 물어보기
    color: #0062ff;  
    border-left: 3px solid #0062ff;
    svg {
      fill: #0062ff;
    }
  }
`;
const Wrapper = styled.div `
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;
const Icon = styled.div `
  margin: 0 24px;
`;
const NameLink = styled.span `
  @media (max-width: 620px) {
    display: none;
  }
`;
const HeaderItem = props => {
    const { icon, name, link } = props;
    return (
      <Wrapper>
        <NavItem exact activeClassName={active} to={link}>
          <Icon>{icon}</Icon>
          <NameLink>{name}</NameLink>
        </NavItem>
      </Wrapper>
    )
};
export default HeaderItem;