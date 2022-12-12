import React from "react";
import styled from "styled-components";

import { ReactComponent as Survey } from "svg/survey.svg";
import { ReactComponent as Response } from "svg/survey_response.svg";
import { ReactComponent as Period } from "svg/survey_period.svg";

const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const Info = styled.div`
  width: 30%;
  padding: 15px;
  display: flex;
  background-color: white;
  border: solid 2px grey;
  border-radius: 0.8rem;
`

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`

const Item = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
`

function Surveyinfo(props) {
  let result = props.result;
  console.log(result);

  return (
    <>
      <InfoDiv>
        <Info>
          <Survey style={{ width: "80px", height: "80px", fill: "grey", margin: "5px", marginLeft: "20px" }} />
          <ItemDiv>
            <Item>
              설문 문항수
            </Item>
            <Item>
              {result.questions.length}
            </Item>
          </ItemDiv>
        </Info>
        <Info>
          <Response style={{ width: "80px", height: "80px", fill: "grey", margin: "5px", marginLeft: "20px" }} />
          <ItemDiv>
            <Item>
              설문 응답수
            </Item>
            <Item>
              {result.responseCnt}
            </Item>
          </ItemDiv>
        </Info>
        <Info>
          <Period style={{ width: "80px", height: "80px", fill: "grey", margin: "5px", marginLeft: "20px" }} />
          <ItemDiv>
            <Item>
              설문 진행기간
            </Item>
            <Item style={{ fontSize: "13px" }}>
              {result.createdDate[0]}년 {result.createdDate[1]}월{" "}
              {result.createdDate[2]}일 ~ {result.expiredDate[0]}년{" "}
              {result.expiredDate[1]}월 {result.expiredDate[2]}일
            </Item>
          </ItemDiv>
        </Info>
      </InfoDiv>
    </>
  );
}

export default Surveyinfo;
