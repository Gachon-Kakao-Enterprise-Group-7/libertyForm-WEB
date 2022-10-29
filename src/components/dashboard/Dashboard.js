import React from 'react';
import styled from 'styled-components'; //styled-components사용

import Sidebar from './sidebar/Sidebar'
import Navs from './Navs'


const MainWrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
  @media (max-width: 450px) {
    padding: 10px;
  }
`
const Username = styled.span`
  font-size: 24px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #171725;
  @media (max-width: 450px) {
    display: none;
  }
`
const Text = styled.span`
  font-size: 18px;
  letter-spacing: 0.1px;
  color: #92929d;
  margin-left: 10px;
  font-family: 'Roboto', sans-serif;
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`


const Dashboard = () => {

  return (

    <>
      <Navs />
      <MainWrapper>
        <Sidebar />
        <Wrapper>
          <HeaderContent>
            <div>
              {/* <Username>안녕,</Username> */}
              <Text>설문지 대시보드입니다.</Text>
            </div>
          </HeaderContent>
        </Wrapper>
      </MainWrapper>
    </>


  );
}

export default Dashboard;