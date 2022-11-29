import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'; // styled components 사용 -> CSS in Js
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import { motion } from "framer-motion"
import axios from 'axios';
import { ReactComponent as downarrow } from "svg/downarrow.svg"



const MainSection= styled.div`
    height: 94vh;
    width: 100%;
    position: relative;
    top: 0px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const SecondSection= styled.div`
    height: 100vh;
    width: 100%;
    position: relative;
    top: 0px;
    background-color:pink;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const Spacingdiv = styled.div`
    height: 1vw;
    margin: auto;
`
const DownarrowSvg= styled(downarrow)`
    margin-top : 20vh;
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
    width: 230px;
    height: 60px;
    border: none;
    outline: none;
    color: #fff;
    background: #ff7800;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    margin-top: 30px;

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

    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);
    console.log(process.env.REACT_APP_DB_HOST)
    //axios 테스트하기 위해서 작성한 임시 axios 코드입니다. 
    // 리버티폼 메인페이지에서 콘솔찍어보면 api통신이 되는지 안되는지 바로 볼 수 있습니다!
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_DB_HOST}/survey`, {
            headers: {
                Authorization: 'Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJqd3RJbmZvIjp7Im1lbWJlcklkIjo0fSwiaWF0IjoxNjY4OTk4MjI5LCJleHAiOjE2NzA3NzYyOTR9.ZVGf5i48rXOpl1hIkraKRcYGDozlTcsKirHVS4MeAww'
            }
        })
            .then((res) => {
                console.log(res)

            })
            .catch((Error) => {
                console.log(Error)
            })
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

    // moveSection((prev) => ({
    //     surveyId: selectSurvey,
    //     receivers: cvusers,
    //   }))
    // }

    return (
        <div>
        <MainSection ref={vantaRef}>
            <Spacingdiv></Spacingdiv>
            <Bodydiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ scale: 1.1 }}>
                <h1>LIBERTY FORM</h1>
                <Mainbutton onClick={isLogin}>
                    시작하기
                </Mainbutton>
            </Bodydiv>
            <Bodydiv>
                <DownarrowSvg></DownarrowSvg>
            </Bodydiv>
        </MainSection>

        <SecondSection>
ddd
        </SecondSection>

        </div>
    );
}

export default Main;
