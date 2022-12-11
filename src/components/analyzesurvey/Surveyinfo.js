import React, { useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as Survey } from "svg/survey.svg";
import { ReactComponent as Response } from "svg/survey_response.svg";
import { ReactComponent as Period } from "svg/survey_period.svg";
import { Flex } from "@semcore/flex-box";

const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Info = styled.div`
  width: 30%;
  margin: auto;
  padding: 20px;
  padding-left: 30px;
  display: flex;
  background-color: white;
  border: solid 2px grey;
  border-radius: 0.8rem;
`;
const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function Surveyinfo(props) {
  let result = props.result;
  console.log(result);

  return (
    <>
      <InfoDiv>
        <Info style={{ padding: "15px" }}>
          <Survey
            style={{
              width: "80px",
              height: "80px",
              fill: "grey",
              margin: "5px",
              marginLeft: "20px",
            }}
          />
          <ItemDiv style={{ marginLeft: "60px", marginTop: "10px" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              설문 문항수
            </p>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              {result.questions.length}
            </p>
          </ItemDiv>
        </Info>
        <Info style={{ padding: "15px" }}>
          <Response
            style={{
              width: "80px",
              height: "80px",
              fill: "grey",
              margin: "5px",
              marginLeft: "20px",
            }}
          />
          <ItemDiv style={{ marginLeft: "60px", marginTop: "10px" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              설문 응답수
            </p>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              {result.responseCnt}
            </p>
          </ItemDiv>
        </Info>
        <Info>
          <Period style={{ width: "80px", height: "80px", fill: "grey" }} />
          <ItemDiv style={{ marginLeft: "20px", marginTop: "10px" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              설문 진행기간
            </p>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                marginLeft: "4px",
              }}
            >
              {result.createdDate[0]}년 {result.createdDate[1]}월{" "}
              {result.createdDate[2]}일 ~ {result.expiredDate[0]}년{" "}
              {result.expiredDate[1]}월 {result.expiredDate[2]}일
            </p>
          </ItemDiv>
        </Info>
      </InfoDiv>
    </>
  );
}

export default Surveyinfo;
