import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import Avatar from 'components/Common/Avatar'
// import Info from 'components/Common/Task/Info'
// import Titles from 'components/Common/Task/Titles'
// import TaskModal from 'components/Common/TaskModal'

import { useDispatch, useSelector } from 'react-redux';


const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  border-radius: 20px;
  padding: 15px;
  margin: 0 5px 10px 5px;
  background : white;
  border:  1px dashed white;
  opacity:  1;
  width: 300x;

`

const Titles = styled.div`
  color: #171725;
  margin-bottom: 7px;
  font-weight: bold;
  /* text-decoration: 
    props.data.score.days === 0 && 'line-through'}; */
`
const Users = styled.div`
  display: grid;
  margin: 10px 0 0 0;
`

const ProgressDiv = styled.div`
  font-size: 0.8rem;
  width: fit-content;
  padding: 3px;
  color:white;
  border-radius: 3px;
  background-color: ${props => props.color}; //색은 props를받아서 적용한다. ProgressDiv가 색상만 다르게 여러곳에 적용될때 이렇게 사용한다.
`

const TaskList = props => {

  const state = useSelector((state) => state.survey)
  console.log(state)

  const now = new Date(); //현재 시간


  return (
    <>
      {state.map((survey, index) => (
        <Wrapper key={index}>
          <Titles>{survey.survey.name}</Titles>
          {/* <Info data={data} /> */}
          <Users>설문 문항 수 : {survey.questions.length + survey.choiceQuestions.length}</Users>
          {(new Date(survey.survey.expirationDate) > now) // 지금 시간보다 설문 만료시간이 더 멀어야 진행중이다.
            ? <ProgressDiv color='#afc4e7'>진행중,{survey.survey.expirationDate}</ProgressDiv>
            : <ProgressDiv color='#fc7399'>만료됨,{survey.survey.expirationDate}</ProgressDiv>
          }

        </Wrapper>
      ))}
    </>
  )
};

export default TaskList