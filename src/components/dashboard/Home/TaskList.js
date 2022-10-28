import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import Avatar from 'components/Common/Avatar'
// import Info from 'components/Common/Task/Info'
// import Titles from 'components/Common/Task/Titles'
// import TaskModal from 'components/Common/TaskModal'



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
  /* text-decoration: 
    props.data.score.days === 0 && 'line-through'}; */
`

const Users = styled.div`
  display: grid;
  margin: 10px 0 0 0;
`
const TaskList = props => {

  return (
    <>
      <Wrapper>
        <Titles>가천대학교 설문지</Titles>
        {/* <Info data={data} /> */}

        <Users>delet버튼 넣을 예정</Users>
      </Wrapper>
      <Wrapper>
        <Titles>제목입니다2</Titles>
        {/* <Info data={data} /> */}

        <Users>delet버튼 넣을 예정</Users>
      </Wrapper>
    </>
  )
};

export default TaskList