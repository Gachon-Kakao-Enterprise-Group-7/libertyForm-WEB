import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ProgressBar from 'react-bootstrap/ProgressBar';

import { Link } from "react-router-dom"; // Link를 이용해 원하는 페이지로 이동할 수 있게 한다


import styled from 'styled-components'; //styled-components사용
import { useMediaQuery } from 'react-responsive' // react-responsive 에서 제공하는 useMediaQuery 사용해 반응형 구성

import { useSelector } from 'react-redux';

const Wrapper = styled.div`
    background-color: #e1e1e1;
    height: 100%;
    text-align: center;
    padding-top: 1vw;
    padding-left: 1rem;
    padding-right: 1rem;
`

function Leftdiv() {

    const state = useSelector(state => state.survey)

    return (
        <Wrapper>
        <div>반갑습니다.</div>
        <Link to="/mksurvey">
            <Button variant="contained" color="success">새로운 설문 생성</Button>
        </Link>
        <hr />
        <ProgressBar animated now={(state.filter(survey => survey.finish === true).length / state.length) * 100} />
        <br />
        <div>전체 설문 : {state.length} </div>
        <div>진행중 설문 : {state.filter(survey => survey.finish === false).length}</div>
        <div>완료된 설문 : {state.filter(survey => survey.finish === true).length}</div>
        
        </Wrapper>
    )
  }
  
  export default Leftdiv
  
