import React, { useEffect } from 'react';
import background from "../img/background.jpg"
import styled from 'styled-components'; // styled components 사용 -> CSS in Js

//MUI
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux' // react-redux사용


const Backgrounddiv = styled.div` // styled components를 사용하여 div를 만듬
    background-image: url(${background});
    margin:0px;
    width:100vw;
    height:100vh;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.85;
`

const Spacingdiv = styled.div`
    width: 80%;
    height: 20vw;
    margin: auto;
`

const Bodydiv = styled.div`
    color: white;
    width: 80%;
    text-align: center;
    align-items: center;
    margin: auto;
`
const H1slogan = styled.h1`
    font-family: var(--font-NotoSans);
    font-size: 6vw;
`
const H2slogan = styled.h2`
    padding-top: 1vw;
    font-size: 2vw;
`


function Main() {

    const state = useSelector((state) => state) // useSelector를 이용해서 store를 읽어옴
    const dispatch = useDispatch();

    return (
        <Backgrounddiv>
            <Spacingdiv></Spacingdiv>
            <Bodydiv>
                <H1slogan>자유롭고 편리한 소통의 시작</H1slogan>
            </Bodydiv>
            <Bodydiv>
                <H2slogan>누구든지 편하고, 자유롭게 이용하고, 당신의 의견을 표현하세요</H2slogan>
            </Bodydiv>
            <Bodydiv>
                <Button className='mt-3' variant="contained" size="large" style={{backgroundColor: 'gray' }} onClick={() => { dispatch({ type: 'TEST' }) }}>
                    시작하기
                </Button>
            </Bodydiv>
        </Backgrounddiv >
    );
}

export default Main;



// https://react-bootstrap.github.io/components/navbar/ -> Navbar 참고
// https://hojung-testbench.tistory.com/entry/React-%EA%B5%AC%EA%B8%80-%ED%8F%B0%ED%8A%B8-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0 -> 구글폰트 적용법