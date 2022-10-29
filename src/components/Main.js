import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'; // styled components 사용 -> CSS in Js
import * as THREE from "three";
import CLOUD from "vanta/dist/vanta.clouds.min";

import { motion } from "framer-motion"

import { useSelector, useDispatch } from 'react-redux' // react-redux사용

import { Link } from "react-router-dom"; // Link를 이용해 원하는 페이지로 이동할 수 있게 한다

const Spacingdiv = styled.div`
    width: 80%;
    height: 15vw;
    margin: auto;

`

const Bodydiv = styled(motion.div)`
    color: lightslategrey;
    width: 80%;
    text-align: center;
    align-items: center;
    margin: auto;
    
`
const H1slogan = styled.h1`
    font-family: var(--font-NotoSans);
    font-size: 5vw;
    cursor: context-menu;
`
const H2slogan = styled.h2`
    padding-top: 1vw;
    font-size: 1.8vw;
    cursor: context-menu;
`
const Mainbutton = styled.button`
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    width: 220px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #6667ab;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    margin-top: 70px;

    &:before {
        content: '';
        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
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
        color: #6667ab;
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
        background: #6667ab;
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

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                CLOUD({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div style={{ height: "100vh", width: "100%" }} ref={vantaRef}>
            <Spacingdiv></Spacingdiv>
            <Bodydiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ scale: 1.1 }}>
                <H1slogan>자유롭고 편리한 소통의 시작</H1slogan>
            </Bodydiv>
            <Bodydiv whileHover={{ scale: 1.1 }}>
                <H2slogan>누구든지 편하고, 자유롭게 이용하고, 당신의 의견을 표현하세요</H2slogan>
            </Bodydiv>
            <Bodydiv >
                <Link to="/Dashboard">
                    <Mainbutton onClick={() => { dispatch({ type: 'TEST' }) }}>
                        시작하기
                    </Mainbutton>
                </Link>
            </Bodydiv>
        </div >
    );
}

export default Main;



// https://react-bootstrap.github.io/components/navbar/ -> Navbar 참고
// https://hojung-testbench.tistory.com/entry/React-%EA%B5%AC%EA%B8%80-%ED%8F%B0%ED%8A%B8-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0 -> 구글폰트 적용법