import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import styled from 'styled-components';

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


function Dashboard() {
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
            <Grid item xs={2}>
            <LeftDiv>
                <div>진행중인 설문</div>
            </LeftDiv>
            </Grid>
            <Grid item xs={10}>
            <RightDiv>우측</RightDiv>
            </Grid>
        </Grid>
        </Box>
    </>
  );
}

export default Dashboard;