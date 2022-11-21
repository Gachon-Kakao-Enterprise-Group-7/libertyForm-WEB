import React, { useEffect } from 'react';
import styled from 'styled-components'; //styled-components사용
import Taskcard from './Taskcard';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { ReactComponent as Bulb } from "../img/bulb.svg";


const Text1 = styled.span`
  font-size: 24px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #171725;
  @media (max-width: 450px) {
    display: none;
  }
`
const Text2 = styled.span`
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid #e2e2ea;
  border-radius: 23px;
  margin: 35px 0 20px 0;
  padding: 15px;
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
  padding-left:30px;
`;
const Nosurvey = styled.div`
  border: 1px solid #e2e2ea;
  border-radius: 23px;
  margin: 35px 0 20px 0;
  padding: 100px;
`
const MksurveyBtn = styled.button`
border: 0px;
background-color: rgb(235, 120, 48);
border-radius: 50px;
width: 150px;
height: 40px;
color:#ffead5;
font-weight: bold;
margin-top: 5px;
&:hover { 
  width: 160px;
  height: 43px;
  font-size: 1.05rem;
  background-color: rgb(201 107 42);
  color:white;
  }
transition: all 300ms;

`



const Dashboard = () => {
  const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    axios.get("/survey", {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    })
      .then((res) => {
        dispatch({ type: 'ADDPREVIEWSURVEY', data: res.data.result.surveys })

      })
      .catch((Error) => {
        console.log(Error)
      })
  }, [])


  const state = useSelector((state) => state.survey.previewsurvey);
  const dispatch = useDispatch();
  console.log(state)
  const now = new Date()//현재시간을 가져 올 수 있다.

  const ongoingSurvey = state.filter((survey, index) => (Math.ceil((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) >= 0).length
  const expiredSurvey = state.filter((survey, index) => (Math.ceil((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) < 0).length

  return (

    <>
      <HeaderContent>
        <div>
          <Text1>환영합니다,</Text1>
          <Text2>설문지 대시보드입니다.</Text2>
        </div>
      </HeaderContent>

      {ongoingSurvey + expiredSurvey > 0
        &&
        <TaskWrapper>
          <Header>
            <TeamsTitle>진행중 설문</TeamsTitle>
          </Header>
          <TasksWrapper>
            {/* filter함수를 써서 먼저 expireDate랑 현재 시간이랑 비교해서 시간이 남은 설문만 보여주고 map함수로 뿌려준다.  */}
            {state && (
              state.filter((survey, index) => (Math.ceil((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) >= 0).map((survey, index) => (
                <Taskcard surveyId={survey.surveyId} code={survey.code} key={index} title={survey.name} expirationDate={survey.expirationDate} createdAt={survey.createdAt} thumbnailImgUrl={survey.thumbnailImgUrl} end={false} />
              ))
            )}
          </TasksWrapper>
        </TaskWrapper>
      }
      {ongoingSurvey + expiredSurvey > 0
        &&
        <TaskWrapper>
          <Header>
            <TeamsTitle>완료된 설문</TeamsTitle>
          </Header>
          <TasksWrapper>
            {state && (
              state.filter((survey, index) => (Math.ceil((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) < 0).map((survey, index) => (
                <Taskcard surveyId={survey.surveyId} code={survey.code} key={index} title={survey.name} expirationDate={survey.expirationDate} createdAt={survey.createdAt} thumbnailImgUrl={survey.thumbnailImgUrl} end={true} />
              ))
            )}
          </TasksWrapper>
        </TaskWrapper>
      }
      {ongoingSurvey + expiredSurvey === 0
        &&
        <Nosurvey style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Bulb width={130}></Bulb>
          <div style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: 'rgb(103 102 102)' }}>반갑습니다. {localStorage.getItem('name')}님</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'rgb(103 102 102)' }}>리버티폼과 함께 당신이 표현하고싶은 모든것을 자유롭게 표현하세요</div>
          <TeamsTitle></TeamsTitle>
          <MksurveyBtn onClick={() => { document.location.href = '/home/mksurvey' }}>설문 생성하기</MksurveyBtn>
        </Nosurvey>
      }
    </>


  );
}

export default Dashboard;