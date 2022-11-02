import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const TempCard = styled.div`
    background-color: #e1e1e1;
    border: 3px solid black;
    width: 500px;
    margin: 50px;
    padding: 20px;

`
const SurveyCard = styled.div`
    background-color: yellow;
    border: 5px dotted red;
    width: 1000px;
    margin: 50px;
    padding: 30px;
`


function Dosurvey() {

  const params = useParams();
  const [surveyDetail, setSurveyDetail] = useState(null) //axios를 통해 받아오는 설문 상세 정보 state
  const [loading, setLoading] = useState(false) // axios에서 정보를 받아오고 랜더링하기 위한 상태 state
  const [error, setError] = useState(null) // 에러발생시 에러를 저장할 수 있는 state
  const [showSurveyNumber, setShowSurveyNumber] = useState(0);

  useEffect(() => {
    setLoading(true)
    const jwt = localStorage.getItem('jwt')
    axios.get(`/survey/${params.surveyId}`, {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    })
      .then((res) => {
        console.log('처음에 데이터 불러오고 그다음에는 실행되면 안되는 useEffect')
        setLoading(false)
        setSurveyDetail(res.data.result)
      })
      .catch((Error) => {
        setError(Error)
      })
  }, [])

  if (loading) return (
    <div>로딩중...{console.log('로딩중입니다...')}</div>
  )
  // axios response가 오기 전에 랜더링이 일어나면 오류가 발생한다. 
  //따라서 loading state로 밑에 본문이 랜더링이 되는것을 막고 loading이 false가 되면 위에 문장이 실행안되고
  // 아래에 본문return이 실행 될 것이다.
  if (error) return (
    <div>에러 발생..{error}</div>
  )
  //에러가 있다면 에러 핸들링
  if (!surveyDetail) return (
    null
  )
  //surveyDetail 이 null이라면 아무것도 반환하지 않는다.


  const startSurvey = () => {
    setShowSurveyNumber(1)
  }

  const nextQuestion = () => {
    if (showSurveyNumber < surveyDetail.questions.length) {
      setShowSurveyNumber(showSurveyNumber + 1)
    }
  }

  const prevQuestion = () => {
    if (showSurveyNumber !== 1) {
      setShowSurveyNumber(showSurveyNumber - 1)
    }
  }





  return (
    <>
      <TempCard>
        <div>설문번호 : {params.surveyId}</div>
        <div>설문이름 : {surveyDetail.survey.name}</div>
        <div>설문문항수 : {surveyDetail.questions.length + surveyDetail.choiceQuestions.length}</div>
        <hr />
        <div>설문을 시작하시겠습니까?</div>
        <button onClick={startSurvey}>설문시작</button>
        <div>{showSurveyNumber}</div>
        {console.log(surveyDetail)}
      </TempCard>
      <div>
        {showSurveyNumber >= 1
          &&
          <SurveyCard>
            <div>{`${showSurveyNumber}. ${surveyDetail.questions[showSurveyNumber - 1].name}`}</div>
            <div>{`question타입 : ${surveyDetail.questions[showSurveyNumber - 1].questionTypeId}`}</div>
            <div>{`필수답변여부 : ${surveyDetail.questions[showSurveyNumber - 1].answerRequired}`}</div>
            <hr />


            {showSurveyNumber === surveyDetail.questions.length // 설문의 마지막 문항일때 조건
              ? <>
                <button onClick={prevQuestion}>이전문항</button>
                <button>제출하기</button>
              </>
              : <>
                <button onClick={prevQuestion}>이전문항</button>
                <button onClick={nextQuestion}>다음문항</button>
              </>
            }


          </SurveyCard>}

      </div>
    </>
  );
}

export default Dosurvey;