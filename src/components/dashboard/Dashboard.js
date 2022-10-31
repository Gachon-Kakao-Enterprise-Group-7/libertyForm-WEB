import React from 'react';
import styled from 'styled-components'; //styled-components사용

import Sidebar from './sidebar/Sidebar'
import Navs from './Navs'
import TCards from "./Tcard"

import { useSelector } from 'react-redux';

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

const TaskWrapper = styled.div`
  border: 1px solid #e2e2ea;
  border-radius: 23px;
  margin: 35px 0 20px 0;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TeamsTitle = styled.span`
  font-size: 20px;
  letter-spacing: 0.1px;
  color: #696974;
  padding: 15px 20px;
  font-weight: bold;
`;
const TasksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


const Dashboard = () => {

  const state = useSelector((state) => state.survey)

  console.log(state)





  return (

    <>
      <Navs />
      <MainWrapper>
        <Sidebar />
        <Wrapper>
          <HeaderContent>
            <div>
              <Username>안녕,</Username>
              <Text>설문지 대시보드입니다.</Text>
            </div>
          </HeaderContent>
          <TaskWrapper>
            <Header>
              <TeamsTitle>진행중 설문</TeamsTitle>
            </Header>
            <TasksWrapper>
              {state.map((survey, index) => (
                <TCards key={index} title={survey.survey.name} expirationDate={survey.survey.expirationDate} />
              ))}

            </TasksWrapper>
          </TaskWrapper>
          <TaskWrapper>
            <Header>
              <TeamsTitle>완료된 설문</TeamsTitle>
            </Header>
            <TasksWrapper>
              <TCards title={'테스트 설문'} />
            </TasksWrapper>
          </TaskWrapper>
        </Wrapper>
      </MainWrapper>
    </>


  );
}

export default Dashboard;