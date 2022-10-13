import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ProgressBar from 'react-bootstrap/ProgressBar';

import { Link } from "react-router-dom"; // Link를 이용해 원하는 페이지로 이동할 수 있게 한다


import styled from 'styled-components'; //styled-components사용
import { useMediaQuery } from 'react-responsive' // react-responsive 에서 제공하는 useMediaQuery 사용해 반응형 구성

import { useSelector } from 'react-redux';

const LeftDiv = styled.div`
    background-color: #e1e1e1;
    height: 100%;
    text-align: center;
    padding-top: 1vw;
    padding-left: 1rem;
    padding-right: 1rem;
`
const RightDiv = styled.div`
    background-color: white;
    height: 100%;
    padding: 2rem;
`

const SurveyDiv = styled.div`
    padding-top: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: bold;
    background-color: #e1e1e1;
    height: 10rem;
    text-align: center;
    border-radius: 0.5rem;

    &:hover
    {
        background-color: #2d2c2c;
        color:white
    }
    
    
    
`
const classes = {
    root: {
        flexGrow: 1
    },
    paper: {
        padding: 20,
        textAlign: "center",
        fontFamily: "Roboto"
    }
};

function AnimatedExample() {
    return <ProgressBar animated now={45} />;
}

function Dashboard() {

    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 }) // 데스크탑 에서 보여질 화면
    const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 }) // 모바일, 테블릿에서 보여질 화면

    const state = useSelector(state => state.survey)



    return (

        <>
            {isDesktopOrLaptop &&
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                            <LeftDiv>
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

                            </LeftDiv>
                            {/* 여기까지가 왼쪽 구역입니다. */}
                        </Grid>
                        <Grid item xs={10}>
                            <RightDiv>
                                <h2>진행중 설문</h2>
                                <hr />
                                <div>
                                    <Grid container spacing={6}>
                                        {state.filter(survey => survey.finish === false).map((survey, index) => {
                                            return (
                                                <Grid item xs={6} sm={4}>
                                                    <SurveyDiv>
                                                        <div>{survey.title}</div>
                                                        <div>문항수 : {survey.question}</div>
                                                        <hr />
                                                        <Button variant="contained" color="primary" onClick={() => { console.log(survey) }}>수정하기</Button>

                                                    </SurveyDiv>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </div>
                                <br />
                                <h2>완료된 설문</h2>
                                <hr />
                                <div>
                                    <Grid container spacing={4}>
                                        {state.filter(survey => survey.finish === true).map((survey, index) => {
                                            return (
                                                <Grid item xs={6} sm={4}>
                                                    <SurveyDiv>
                                                        <div>{survey.title}</div>
                                                        <div>문항수 : {survey.question}</div>
                                                        <hr />
                                                        <Button style={{ marginRight: '0.5rem' }} variant="contained" color="primary" >분석보기</Button>
                                                        <Button variant="contained" color="error" >삭제하기</Button>
                                                    </SurveyDiv>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </div>
                            </RightDiv>
                        </Grid>
                    </Grid>
                </Box>
            }
            {isTabletOrMobileDevice &&
                <RightDiv>
                    <Box sx={{ flexGrow: 1 }}>
                        <h2>진행중 설문</h2>
                        <hr />
                        <div></div>
                        <Grid container spacing={6}>
                            {state.filter(survey => survey.finish === false).map((survey, index) => {
                                return (
                                    <Grid item xs={6} sm={4}>
                                        <SurveyDiv>
                                            <div>{survey.title}</div>
                                            <div>문항수 : {survey.question}</div>
                                            <hr />
                                            <Button variant="contained" color="primary">수정하기</Button>

                                        </SurveyDiv>
                                    </Grid>
                                )
                            })}

                        </Grid>
                        <br />
                        <h2>완료된 설문</h2>
                        <hr />
                        <Grid container spacing={6}>
                            {state.filter(survey => survey.finish === true).map((survey, index) => {
                                return (
                                    <Grid item xs={6} sm={4}>
                                        <SurveyDiv>
                                            <div>{survey.title}</div>
                                            <div>문항수 : {survey.question}</div>
                                            <hr />
                                            <Button style={{ marginRight: '0.5rem' }} variant="contained" color="primary" >분석보기</Button>
                                            <Button variant="contained" color="error" >삭제하기</Button>
                                        </SurveyDiv>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </RightDiv>
            }


        </>
    );
}

export default Dashboard;