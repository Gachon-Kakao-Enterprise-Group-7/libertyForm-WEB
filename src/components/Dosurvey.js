import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const TempCard = styled.div`
    background-color: yellow;
    margin:50px;

`



function Dosurvey() {

    const params = useParams();
    const [surveyDetail, setSurveyDetail] = useState('')

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        axios.get(`/survey/${params.surveyId}`, {
          headers: {
            Authorization: 'Bearer ' + jwt
          }
        })
          .then((res) => {
            console.log(res.data.result)
            setSurveyDetail(res.data.result)
          })
          .catch((Error) => {
            console.log(Error)
          })
      }, [])
    return (
        <>
            <TempCard>
                <div>설문을 시작하시겠습니까?</div>
                <button>설문시작</button>
                <hr />
                <div>설문번호 : {params.surveyId}</div>
                <div>설문이름 : {surveyDetail.survey.name}</div>
                <div>설문문항수 : {surveyDetail.questions.length + surveyDetail.choiceQuestions.length}</div>
            </TempCard>
        </>
    );
}

export default Dosurvey;