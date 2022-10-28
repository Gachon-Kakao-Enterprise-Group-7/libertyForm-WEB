import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import Task from 'components/Common/Task';
// import { getTasks } from 'store/tasks/selectors';

const Wrapper = styled.div `
  border: 1px solid #e2e2ea;
  border-radius: 23px;
  margin: 35px 0 20px 0;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const Header = styled.div `
  display: flex;
  justify-content: space-between;
`;
const TeamsTitle = styled.span `
  font-size: 16px;
  letter-spacing: 0.1px;
  color: #696974;
  padding: 15px 20px;
`;
const Teams = styled.div `
  display: flex;
  flex-wrap: wrap;
`;
const TasksWrapper = styled.div `
  display: flex;
  flex-wrap: wrap;
`;
 const Tasks = props => {
    // const { tasks } = props;
    // const tasksList = tasks.map((item) => (React.createElement(Task, { data: item, key: item.id })));
    return (
        <Wrapper>
          <Header>
            <TeamsTitle>Tasks</TeamsTitle>
          </Header>
          <Teams>
            <TasksWrapper>sfsfffs</TasksWrapper>
            <TasksWrapper>dddd</TasksWrapper>
          </Teams>
        </Wrapper>
      )
};
// const mapStateToProps = (state) => {
//     return {
//         tasks: getTasks(state)
//     };
// };
export default Tasks;
