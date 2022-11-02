import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const TempCard = styled.div`
    background-color: #f8f8d7;
    border: 3px solid black;
    margin:50px;
    padding: 20px;

`



function Dosurvey() {

    const params = useParams();
    const [surveyDetail, setSurveyDetail] = useState(null) //axios를 통해 받아오는 설문 상세 정보 state
    const [loading, setLoading] = useState(false) // axios에서 정보를 받아오고 랜더링하기 위한 상태 state
    const [error, setError] = useState(null) // 에러발생시 에러를 저장할 수 있는 state

    useEffect(() => {
        setLoading(true)
        const jwt = localStorage.getItem('jwt')
        axios.get(`/survey/${params.surveyId}`, {
          headers: {
            Authorization: 'Bearer ' + jwt
          }
        })
          .then((res) => {
            console.log(res)
            setLoading(false)
            setSurveyDetail(res.data.result)
          })
          .catch((Error) => {
            setError(Error)
          })
      },[])

    if(loading) return( 
        <div>로딩중...{console.log('로딩중입니다...')}</div>
    )
    // axios response가 오기 전에 랜더링이 일어나면 오류가 발생한다. 
    //따라서 loading state로 밑에 본문이 랜더링이 되는것을 막고 loading이 false가 되면 위에 문장이 실행안되고
    // 아래에 본문return이 실행 될 것이다.
    if(error) return(
        <div>에러 발생..{error}</div>
    )
    //에러가 있다면 에러 핸들링
    if(!surveyDetail) return(
        null
    ) 
    //surveyDetail 이 null이라면 아무것도 반환하지 않는다.

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