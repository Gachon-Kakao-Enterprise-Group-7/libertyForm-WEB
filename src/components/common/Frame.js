import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import { Route, Routes } from "react-router-dom";

import Dashboard from '../dashboard/Dashboard';
import Mksurvey from '../makesurvey/Mksurvey';
import Surveysend from '../sendsurvey/Surveysend';
import Sendermanagement from '../contact/Sendermanagement';
import EditSurvey from 'components/editsurvey/EditSurvey';
import Analyzesurvey from '../analyzesurvey/Analyzesurvey';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 85%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
  @media (max-width: 450px) {
    padding: 10px;
  }

`
const MainWrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`

const Frame = () => {
  return (
    <>
      <MainWrapper>
        <Sidebar />
        <Wrapper>
          <Routes>
            {localStorage.getItem('email') //로그인된 여부에 따라 경로를 다르게 설정함
              ? <Route path='dashboard' element={< Dashboard />} />
              : document.location.href = "/login"
            }
            <Route path='mksurvey' element={<Mksurvey />} />
            <Route path='surveysend' element={<Surveysend />} />
            <Route path='sendermanagement' element={<Sendermanagement />} />
            <Route path='editsurvey/:surveyCode' element={<EditSurvey />} />
            <Route path='analyzesurvey' element={<Analyzesurvey />} />
          </Routes>
        </Wrapper>
      </MainWrapper>
    </>
  )
}

export default Frame
