import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'; // styled components 사용 -> CSS in Js
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import { motion } from "framer-motion"
import axios from 'axios';
import ReactFullpage from "@fullpage/react-fullpage";
import { useDispatch } from 'react-redux';

import NavbarOn from 'components/onboarding/NavbarOn';
import Services from 'components/onboarding/Services';
import Section1 from 'components/onboarding/Section1';
import Section2 from 'components/onboarding/Section2';
import Section3 from 'components/onboarding/Section3';
import Section4 from 'components/onboarding/Section4';
import { ReactComponent as downarrow } from "svg/downarrow.svg";

const MainSection = styled.div`
    height: 100vh;
    width: 100% auto;
    position: relative;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`


const Spacingdiv = styled.div`
    width: 100%;
    height: 10vw;
    margin: auto;

`

const Bodydiv = styled(motion.div)`
    text-align: center;
    align-items: center;
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
const DownarrowSvg = styled(downarrow)`
    margin-top : 20vh;
    margin-bottom : 10vh;
    width:50px;
    height:50px;
    fill : grey;
    animation: sdb 1.5s infinite;

    @keyframes sdb {
    0% {
        transform: translateY(0, 0);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translateY(20px);
        opacity: 0;
    }
}
`

function Main() {


    const SEL = "custom-section";
    const SECTION_SEL = `.${SEL}`;

    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);
    const dispatch = useDispatch()


    console.log(process.env.REACT_APP_DB_HOST)

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt')
            axios.get(`${process.env.REACT_APP_DB_HOST}/survey`, {
                headers: {
                    Authorization: 'Bearer' + jwt
                }
            })
                .then((res) => {
                    dispatch({ type: 'ADDPREVIEWSURVEY', data: res.data.result.surveys })

                })
                .catch((Error) => {
                    console.log(Error)
                })
        }
    }, [])

    //여기까지 axios 테스트 코드

    const isLogin = () => {
        if (localStorage.getItem('email')) {
            document.location.href = '/home/dashboard'
        }
        else {
            document.location.href = '/login'
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

        <ReactFullpage
            navigation
            sectionSelector={SECTION_SEL}
            render={(comp) => (
                <ReactFullpage.Wrapper>
                    <div className={SEL}>

                        <div style={{ width: '100% auto' }}>
                            <NavbarOn />
                            <MainSection ref={vantaRef}>
                                <Spacingdiv />
                                <Bodydiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ scale: 1.1 }}>
                                    <h1>LIBERTY FORM</h1>
                                </Bodydiv>
                                <Bodydiv >
                                    <Mainbutton onClick={isLogin}>
                                        시작하기
                                    </Mainbutton>
                                </Bodydiv>
                                <Bodydiv>
                                    <DownarrowSvg></DownarrowSvg>
                                </Bodydiv>
                            </MainSection>
                        </div>
                    </div>
                    <div className={SEL}>
                        <Services />
                    </div>
                    <div className={SEL}>
                        <Section2 />
                    </div>
                    <div className={SEL}>
                        <Section1 />
                    </div>
                    <div className={SEL}>
                        <Section3 />
                    </div>
                    <div className={SEL}>
                        <Section4 />
                    </div>
                </ReactFullpage.Wrapper>
            )}
        />
    );
}

export default Main;

