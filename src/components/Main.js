import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'; // styled components 사용 -> CSS in Js
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

import { motion } from "framer-motion"

import { useSelector, useDispatch } from 'react-redux' // react-redux사용

import { Link } from "react-router-dom"; // Link를 이용해 원하는 페이지로 이동할 수 있게 한다


const Spacingdiv = styled.div`
    width: 80%;
    height: 18vw;
    margin: auto;

`

const Bodydiv = styled(motion.div)`
    width: 80%;
    text-align: center;
    align-items: center;
    margin: auto;

    & h1 {
    font-family: "Montserrat";
    font-size: 7vw;
    cursor: context-menu;
    font-weight: 3000;
    color: transparent;
    -webkit-text-stroke: 3px white;
    :hover{
        color:white;
    }
  }

  & h2 {
    padding-top: 1vw;
    font-size: 1.8vw;
    cursor: context-menu;
  }`
    

const Mainbutton = styled.button`
    font-weight: bold;
    font-size : 23px;
    width: 250px;
    height: 70px;
    border: none;
    outline: none;
    color: #fff;
    background: #ff7800;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    margin-top: 80px;

    &:before {
        content: '';
        background: linear-gradient(45deg, #ffebeb, #ffff8f, #ffea00, #fdda0d, #ffbf00, #fdda0d, #ffea00, #ffff8f, #ffebeb);
        position: absolute;
        top: -2px;
        left:-2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing 20s linear infinite;
        opacity: 0.2;
        transition: opacity .3s ease-in-out;
        border-radius: 10px;
    }

    &:active {
        color: #ff7800;
    }

    &:active:after {
        background: transparent;
    }

    &:hover:before {
        opacity: 0.6;
    }

    &:after {
        z-index: -1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: #ff7800;
        left: 0;
        top: 0;
        border-radius: 10px;
        opacity: 0.8;
    }

    @keyframes glowing {
        0% { background-position: 0 0; }
        50% { background-position: 400% 0; }
        100% { background-position: 0 0; }
    }
`

function Main() {

    const state = useSelector((state) => state) // useSelector를 이용해서 store를 읽어옴
    const dispatch = useDispatch();
    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);

    const isLogin = () =>{
        if(localStorage.getItem('email')){
            document.location.href ='/home/dashboard'
        }
        else{
            document.location.href='/login'
        }
    }

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                FOG({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div style={{ height: "100vh", width: "100%", position: 'absolute', top: '0px', zIndex:'-1' }} ref={vantaRef}>
            <Spacingdiv></Spacingdiv>

            <Bodydiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ scale: 1.1 }}>      
                <h1>LIBERTY FORM</h1>
            </Bodydiv>


            <Bodydiv >
                    <Mainbutton onClick={isLogin}>
                        시작하기
                    </Mainbutton>
            </Bodydiv>
        </div >
    );
}

export default Main;

