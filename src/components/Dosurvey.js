import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Slider from '@mui/material/Slider';

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

const LinerBtn = styled.button`
  
  color: ${props => props.checked ? 'white' : 'black'};
  background:${props => props.checked ? 'black' : 'white'} ;
  border:0px;
  width: 40px;
  border-radius: 5px;
`


function Dosurvey() {

  const params = useParams();
  const [surveyDetail, setSurveyDetail] = useState(null) //axios를 통해 받아오는 설문 상세 정보 state
  const [loading, setLoading] = useState(false) // axios에서 정보를 받아오고 랜더링하기 위한 상태 state
  const [error, setError] = useState(null) // 에러발생시 에러를 저장할 수 있는 state
  const [showSurveyNumber, setShowSurveyNumber] = useState(0); //현재 답변중인 문항 번호

  const [result, setResult] = useState('')//설문의 결과를 저장하는 state
  const [inputs, setInputs]= useState(); // 당장 그 문항에 입력된 데이터를 가지고 있음!

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
        setResult([]) // result 배열의 공간을 만들어준다.
      })
      .catch((Error) => {
        setError(Error)
      })
  }, [])


  useEffect(()=>{
    console.log('inputs이 변화했습니다',inputs)
  },[inputs])


  if (loading) return (
    <div>로딩중...</div>
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

  const onSubmit = () => {
    if (surveyDetail.questions[showSurveyNumber - 1].answerRequired) { // 필수문항이면
      if ((result[showSurveyNumber - 1] != null)) { // 문항에 응답했으면
        console.log(result, '제출!')
      }
      else {
        alert('필수 문항입니다. 답변해주세요!')
      }
    }
    else {
      if (result[showSurveyNumber - 1] == undefined) { // 필수답변은 아니지만 문항에 응답을 안했으면
        result[showSurveyNumber - 1] = null
      }
      console.log(result, '제출')
    }
  }

  const nextQuestion = () => {
    if (surveyDetail.questions[showSurveyNumber - 1].answerRequired) { // 필수문항이면
      if (showSurveyNumber < surveyDetail.questions.length && result[showSurveyNumber - 1] !== undefined) { //마지막 문항이 아니고 && 설문에 응답했으면
        setShowSurveyNumber(showSurveyNumber + 1) // 다음 문항으로 넘어가줘라
        if(result[showSurveyNumber]==undefined){ // 다음 문항에 내용이 아직 없다면
          setInputs('') // input창에 아무것도 안보여주고
        }
        else{
        setInputs(result[showSurveyNumber]) // inputs 값에 이미 답변한 내용을 보여줘라!
        }
      }
      else {
        alert('필수 문항입니다. 답변해주세요!')
      }
    }
    else {
      if (showSurveyNumber < surveyDetail.questions.length) { //필수 문항이 아님'
        if (result[showSurveyNumber - 1] == undefined) { // 문항 답변에 아무것도 없을 경우에
          result[showSurveyNumber - 1] = null // 널값을 집어넣고
          setShowSurveyNumber(showSurveyNumber + 1)//다음 문항으로 넘어간다
          if(result[showSurveyNumber]==undefined){ // 다음 문항에 내용이 아직 없다면
            setInputs('') // input창에 아무것도 안보여주고
          }
          else{
          setInputs(result[showSurveyNumber]) // inputs 값에 이미 답변한 내용을 보여줘라!
          }
        }
        else{
          setShowSurveyNumber(showSurveyNumber+1) //답변이 있을경우 그냥 다음 문제로 넘어간다.
          if(result[showSurveyNumber]==undefined){ // 다음 문항에 내용이 아직 없다면
            setInputs('') // input창에 아무것도 안보여주고
          }
          else{
          setInputs(result[showSurveyNumber]) // inputs 값에 이미 답변한 내용을 보여줘라!
          }
        }
      }

    }
  }



  const prevQuestion = () => {
    if (showSurveyNumber !== 1) {
      setInputs(result[showSurveyNumber - 2])
      setShowSurveyNumber(showSurveyNumber - 1)
    }
  }


  const onChangeType1 = (e)=>{
    let temparr = result
    temparr[showSurveyNumber - 1] = e.target.value
    setResult(temparr)
    setInputs(e.target.value)
  }


  const onChangeType2 = (e) => {
    let temparr = result
    temparr[showSurveyNumber - 1] = e.target.value
    setResult(temparr)
    setInputs(e.target.value)
  }


  const onChangeType5 = (e, value) => {
    let temparr = result
    temparr[showSurveyNumber - 1] = value
    setResult(temparr)
    setInputs(value)
  }

  const onChangeType6 = (e) => {
    let tempArr = result
    tempArr[showSurveyNumber - 1] = e.target.name
    setInputs(e.target.name)
  }


  
  return (
    <>
      디자인작업 진행 0%, 로직 진행도 20%, 위에 NAV안나오게 해야함
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

            {surveyDetail.questions[showSurveyNumber - 1].questionTypeId === 1 && //1번 타입의 문항(장문)을 경우 아래의 식을 수행
              <input style={{ width: '100%' }} name={showSurveyNumber} onChange={onChangeType1} value={inputs}></input>
            }
            {surveyDetail.questions[showSurveyNumber - 1].questionTypeId === 2 && //2번 타입의 문항(단문)을 경우 아래의 식을 수행
              <input style={{ width: '50%' }} name={showSurveyNumber} onChange={onChangeType2} value={inputs}></input>
            }
            {surveyDetail.questions[showSurveyNumber - 1].questionTypeId === 5 && //5번 타입의 문항(감정바)을 경우 아래의 식을 수행
              <div style={{ width: '500px' }}>
                <Slider onChange={onChangeType5} valueLabelDisplay="auto" value={inputs} />
              </div>
            }
            {surveyDetail.questions[showSurveyNumber - 1].questionTypeId === 6 && //6번 타입의 문항(선형배율)을 경우 아래의 식을 수행
              <>
                <LinerBtn checked={inputs==='1'?true:false} name='1' onClick={onChangeType6} >1 </LinerBtn>
                <LinerBtn checked={inputs==='2'?true:false} name='2' onClick={onChangeType6}>2 </LinerBtn>
                <LinerBtn checked={inputs==='3'?true:false} name='3' onClick={onChangeType6}>3 </LinerBtn>
                <LinerBtn checked={inputs==='4'?true:false} name='4' onClick={onChangeType6}>4 </LinerBtn>
                <LinerBtn checked={inputs==='5'?true:false} name='5' onClick={onChangeType6}>5 </LinerBtn>
              </>
              
            }
            {console.log(result)}


            <div>{`question타입 : ${surveyDetail.questions[showSurveyNumber - 1].questionTypeId}`}</div>
            <div>{`필수답변여부 : ${surveyDetail.questions[showSurveyNumber - 1].answerRequired}`}</div>



            <hr />
            {showSurveyNumber === surveyDetail.questions.length // 설문의 마지막 문항일때 조건
              ? <>
                <button onClick={prevQuestion}>이전문항</button>
                <button onClick={onSubmit}>제출하기</button>
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