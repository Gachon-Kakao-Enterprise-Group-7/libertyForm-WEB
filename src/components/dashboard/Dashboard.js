import React, { useEffect } from 'react';
import styled from 'styled-components'; //styled-components사용

import Sidebar from './sidebar/Sidebar'
import Navs from './Navs'
import TCards from "./Tcard"

import { motion } from "framer-motion" // 애니메이션 효과
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const MainWrapper = styled(motion.div)`
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

  const state = useSelector((state) => state.survey.previewsurvey);
  const dispatch = useDispatch();
  console.log(state)
  const now = new Date()//현재시간을 가져 올 수 있다.

  useEffect(()=>{
    axios.get("/survey",{
      headers:{
        Authorization : 'Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJqd3RJbmZvIjp7Im1lbWJlcklkIjozfSwiaWF0IjoxNjY3MTM1NzM4LCJleHAiOjE2Njg5MTM4MDN9.T_vYUXWTpHCPJbQ6HIGAsY8PK2myLQUUtLs0853vafg'
      }
    })
    .then((res)=>{
      dispatch({type:'ADDPREVIEWSURVEY', data:res.data.result.surveys})
  
    })
    .catch((Error)=>{
      console.log(Error)
    })
  },[])

  return (

    <>
      <Navs />
      <MainWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
              {/*filter함수를 써서 먼저 expireDate랑 현재 시간이랑 비교해서 시간이 남은 설문만 보여주고 map함수로 뿌려준다.  */}
              {state.filter((survey, index)=> (new Date(survey.expirationDate) - now)>0).map((survey, index) => (
                <TCards key={index} title={survey.name} expirationDate={survey.expirationDate} />
              ))} 
            </TasksWrapper>
          </TaskWrapper>
          <TaskWrapper>
            <Header>
              <TeamsTitle>완료된 설문</TeamsTitle>
            </Header>
            <TasksWrapper>
              {state.filter((survey, index)=> (new Date(survey.expirationDate) - now)<=0).map((survey, index) => (
                <TCards styled={{}} key={index} title={survey.name} expirationDate={survey.expirationDate} />
              ))}
            </TasksWrapper>
          </TaskWrapper>
        </Wrapper>
      </MainWrapper>
    </>


  );
}

export default Dashboard;