import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BackgroundDiv = styled.div`
  position: absolute;
  top: 0px; // nav바 가려버림
  background: #e1e1e1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center; //세로축
  justify-content: center; //가로축
`;
const StartCard = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  width: 700px;
  padding: 30px;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
`;

const TitleMessage = styled.div`
  font-size: 2rem;
  margin: auto;
  text-align: center;
  padding-bottom: 50px;
`;

const LibertyBtn = styled.button`
  border: 0px;
  margin: auto;
  background-color: black;
  color: white;
  width: 250px;
  height: 40px;
  border-radius: 20px;
`;
const Linked = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;

function AlreadyAnswered() {
  return (
    <BackgroundDiv>
      <StartCard>
        <TitleMessage>이미 설문에 응답했습니다!</TitleMessage>
        <Linked to="/">
          <LibertyBtn>LibertyForm으로 이동하기</LibertyBtn>
        </Linked>
      </StartCard>
    </BackgroundDiv>
  );
}

export default AlreadyAnswered;
