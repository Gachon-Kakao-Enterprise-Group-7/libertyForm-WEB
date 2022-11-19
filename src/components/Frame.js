import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import { Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import Mksurvey from './Mksurvey';
import Surveysend from './Surveysend';
import Sendermanagement from './Sendermanagement';


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
          </Routes>
        </Wrapper>
      </MainWrapper>
    </>
  )
}

export default Frame
