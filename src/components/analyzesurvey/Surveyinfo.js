import React, { useEffect } from 'react';
import styled from 'styled-components';

import { ReactComponent as Survey } from "svg/survey.svg";
import { ReactComponent as Response } from "svg/survey_response.svg";
import { ReactComponent as Period } from "svg/survey_period.svg";

const InfoDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const Info = styled.div`
    width: 30%;
    margin: auto;
`

function Surveyinfo(props) {
    let result = props.result
    console.log(result)

    return (
        <>
            <InfoDiv>
                <Info><Survey style={{ width: '100px', height: '100px' }} /><br />설문문항수<br />{result.questions.length}</Info>
                <Info><Response style={{ width: '100px', height: '100px' }} /><br />설문응답수<br />{result.responseCnt}</Info>
                <Info><Period style={{ width: '100px', height: '100px' }} /><br />설문진행기간<br />{result.createdDate[0]}년 {result.createdDate[1]}월 {result.createdDate[2]}일 ~ {result.expiredDate[0]}년 {result.expiredDate[1]}월 {result.expiredDate[2]}일</Info>
            </InfoDiv>
        </>
    )
}

export default Surveyinfo;