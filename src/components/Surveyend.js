import React from 'react';
import styled from 'styled-components';


const BackgroundDiv = styled.div`
  position: absolute;
  top:0px; // nav바 가려버림
  background: #e1e1e1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center; //세로축
  justify-content: center;  //가로축
`
const StartCard = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    color:black;
    width: 700px;
    padding: 30px;
    border-radius: 40px;

`

const TitleMessage = styled.div`
    font-size: 2rem;
    margin: auto;
    text-align: center;
    padding-bottom:50px;
`

const LibertyBtn = styled.button`
    border: 0px;
    margin: auto;
`

function Surveyend() {

  return (
    <BackgroundDiv>
      <StartCard>
        <TitleMessage>설문에 참여해 주셔서 감사합니다</TitleMessage>
        <LibertyBtn>LibertyForm</LibertyBtn>
      </StartCard>
    </BackgroundDiv>
  );
}

export default Surveyend;