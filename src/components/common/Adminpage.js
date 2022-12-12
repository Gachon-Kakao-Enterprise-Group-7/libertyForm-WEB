import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Prohibition } from "svg/prohibition.svg";

const Container = styled.div`
  position: absolute;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #ffbac9;
  font-size: 3rem;
  font-weight: bold;
  color: white;
  z-index: 1;
`;
const HomeBtn = styled.button`
  font-size: 1.5rem;
  border: 0px;
  color: white;
  border-radius: 5px;
  padding: 10px;
  background-color: rgb(204, 9, 46);
`;

function Adminpage() {
  if (localStorage.getItem("email") !== "bwj59@naver.com") {
    return (
      <Container>
        <Prohibition width="300px" />
        <div style={{ margin: "20px" }}>접근 권한이 없습니다<br />관리자에게 문의하세요</div>
        <Link to="/">
          <HomeBtn>홈으로 돌아가기</HomeBtn>
        </Link>
      </Container>
    );
  }

  return (
    <div>
      <div>관리자 페이지 입니다.</div>
      <div>테스트</div>
    </div>
  );
}

export default Adminpage;
