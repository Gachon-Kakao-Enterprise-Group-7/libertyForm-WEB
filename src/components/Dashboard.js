import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive' // react-responsive 에서 제공하는 useMediaQuery 사용해 반응형 구성

import { useSelector } from 'react-redux';

const LeftDiv = styled.div`
    background-color: yellow;
    height: 100vw;
    text-align: center;
    padding-top: 1vw;
`
const RightDiv = styled.div`
    background-color: blue;
    height: 100%;
`

const SurveyDiv = styled.div`
    background-color: yellow;
    height: 10rem;
    text-align: center;
    margin: 1rem;
    border-radius: 0.5rem;
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


function Dashboard() {


    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 }) // 데스크탑 에서 보여질 화면
    const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 }) // 모바일, 테블릿에서 보여질 화면

    const state = useSelector(state => state)
    console.log(state)

    return (

        <>
            {isDesktopOrLaptop &&
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                            <LeftDiv>
                                <div>데스크탑 버전입니다.</div>
                            </LeftDiv>
                        </Grid>
                        <Grid item xs={10}>
                            <RightDiv>
                            <div style={classes.root}>
                                <Grid container spacing={3}>
                                <Grid item xs={6} sm={4}>
                                 <Paper style={classes.paper}>테스트</Paper>
                                    </Grid>
                                   <Grid item xs={6} sm={4}>
                                 <Paper style={classes.paper}>테스트</Paper>
                                    </Grid>
                                   <Grid item xs={6} sm={4}>
                                 <Paper style={classes.paper}>테스트</Paper>
                                    </Grid>
                                   <Grid item xs={6} sm={4}>
                                 <Paper style={classes.paper}>테스트</Paper>
                                    </Grid>
                                   <Grid item xs={6} sm={4}>
                                 <Paper style={classes.paper}>테스트</Paper>
                                    </Grid>
                                   <Grid item xs={6} sm={4}>
                                 <Paper style={classes.paper}>테스트</Paper>
                                    </Grid>
                                </Grid>
                                </div>
                            </RightDiv>
                        </Grid>
                    </Grid>
                </Box>
            }
            {isTabletOrMobileDevice &&
                <Box sx={{ flexGrow: 1 }}>
                    <span>진행중인 설문</span>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <SurveyDiv>가천전자 설문</SurveyDiv>
                        </Grid>
                        <Grid item xs={6}>
                            <SurveyDiv>OOOO 설문</SurveyDiv>
                        </Grid>
                        <Grid item xs={6}>
                            <SurveyDiv>XXXX 설문</SurveyDiv>
                        </Grid>
                        <Grid item xs={6}>
                            <SurveyDiv>BBBBB 설문</SurveyDiv>
                        </Grid>
                        <Grid item xs={6}>
                            <SurveyDiv>AAAA 설문</SurveyDiv>
                        </Grid>
                    </Grid>
                    <span>완료된 설문</span>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <SurveyDiv>가천전자 설문</SurveyDiv>
                        </Grid>
                        <Grid item xs={6}>
                            <SurveyDiv>QQQQ 설문</SurveyDiv>
                        </Grid>
                        <Grid item xs={6}>
                            <SurveyDiv>WWWW 설문</SurveyDiv>
                        </Grid>
                        <Grid item xs={6}>
                            <SurveyDiv>EEEE 설문</SurveyDiv>
                        </Grid>
                        <Grid item xs={6}>
                            <SurveyDiv>RRRR 설문</SurveyDiv>
                        </Grid>
                    </Grid>
                </Box>
            }


        </>
    );
}

export default Dashboard;