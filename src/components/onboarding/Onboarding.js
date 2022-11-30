import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'; // styled components 사용 -> CSS in Js;
import { motion } from "framer-motion"
import { ReactComponent as downarrow } from "svg/downarrow.svg"



const MainSection= styled.div`
    height: 100vh;
    width: 100%;
    position: relative;
    top: 0px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: black;
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
`

function Onboarding() {

    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);

    const moveSection = (e) => {
        if (!window.scrollY) return;
        // 현재 위치가 이미 최상단일 경우 return
      
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      
      };

    return (
        <div>
        <MainSection>
            <Spacingdiv></Spacingdiv>
            <Bodydiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ scale: 1.1 }}>
                <h1>LIBERTY FORM</h1>
                <Mainbutton>
                    시작하기
                </Mainbutton>
            </Bodydiv>
            <Bodydiv>
                <DownarrowSvg onClick={moveSection}></DownarrowSvg>
            </Bodydiv>
        </MainSection>

        <SecondSection>
        </SecondSection>

        </div>
    );
}

export default Onboarding;

