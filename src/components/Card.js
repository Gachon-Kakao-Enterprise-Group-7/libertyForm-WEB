import React from "react";
import styled, { css } from "styled-components";
import background from "../img/loba.jpg"
import kakaobtn from "../img/kakao_login_large_wide.png"

import {KAKAO_AUTH_URL} from './OAuth';


export const Backgrounddiv = styled.div` // styled components를 사용하여 div를 만듬
    margin:0px;
    width:100vw;
    height:100vh;

    display : flex;
    align-items: center;
    justify-content: center;
    position :relative;

    ::before {
      
        background-image: url(${background});
        margin:0px;
        width:100vw;
        height:100vh;
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        z-index: -1;
        position :absolute;
        content: "";
        filter: blur(4px); 
        transform: scale(1.1); //가장자리 안보이게 하기
  }
    
`;

export const KaKaoBtn = styled.button`
  background-image: url(${kakaobtn});
  background-repeat: no-repeat;
  background-size: cover; 
  margin : auto;  
  color : transparent;
  width: 100%;
  border: 0;
  border-radius: 16px;
  height: 60px;
  text-align: center;
  

  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);


  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;


export const CardWrapper = styled.div`
  overflow: hidden;
  background-color: white;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 500px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 80), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  color : black;

`;

export const CardHeader = styled.header`
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const CardHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

export const CardBody = styled.div`

  padding-right: 50px;
  padding-left: 50px;

`;

export const CardFieldset = styled.fieldset`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;

  & + & {
    margin-top: 30px;
  }

  &:nth-last-of-type(2) {
    margin-top: 16px;
  }

  &:last-of-type {
    text-align: center;
  }
`;

export const CardInput = styled.input`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;

  &:focus {
    border-bottom-color: #e5195f;
    outline: 0;
  }
`;

export const CardIcon = styled.span`
  color: #666;
  cursor: pointer;
  opacity: .25;
  transition: opacity .25s ease-in;

  &:hover {
    opacity: .95;
  }

  ${props =>
    props.big &&
    css`
      font-size: 26px;
    `}

  ${props =>
    props.eye &&
    css`
      position: absolute;
      top: 8px;
      right: 0;
    `}

  ${props =>
    props.small &&
    css`
      font-size: 14px;
    `}
`;

export const CardOptionsNote = styled.small`
  padding-top: 15px;
  display: block;
  width: 100%;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
`;

export const CardOptions = styled.ul`
  padding: 0;
  margin: 16px 0 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style-type: none;
`;

export const CardOptionsItem = styled.li`
  &:nth-of-type(n + 2) {
    margin-left: 16px;
  }
`;

export const CardButton = styled.button`
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #5d64c6;
  border: 0;
  border-radius: 16px;
  height: 60px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

export const CardLink = styled.a`
  color: black;
  margin: 5px;
  display: inline-block;
  font-size: 15px;
  text-decoration: none;
  border-bottom: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
  transition: color 0.25s ease-in;


  /* 
  color: black;
  padding: 0;
  margin: 16px 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  list-style-type: none; */

  &:hover {
    color: #5d64c6;
  }
`;