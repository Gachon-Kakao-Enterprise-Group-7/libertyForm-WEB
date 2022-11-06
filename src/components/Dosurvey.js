import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Slider from '@mui/material/Slider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';

import { ReactComponent as EmotionGood } from "../img/emotiongood.svg";
import { ReactComponent as EmotionBad } from "../img/emotionbad.svg";

const BackgroundDiv = styled.div`
  background: #301e4e;
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
const SurveyCard = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    color:black;
    width: 700px;
    padding: 30px;
    border-radius: 40px;
    
`
const QuestionTitle = styled.div`
  font-size: 2rem;
`
const LinerBtn = styled.button`
  color: ${props => props.checked ? 'white' : 'black'};
  background:${props => props.checked ? 'black' : '#e1e1e1'} ;
  border:0px;
  width: 120px;
  height: 100px;
  border-radius: 5px;
  font-size: 30px;
  font-weight: bold;

  &:hover {
    background: #000000;
    color:white
  }
`
const EmotionSlider = styled(Slider)({
  color: '#52af77 !important', //important를 이용해서 css우선순위를 1순위로 끌어올렸다.
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundImage: "url('../img/emotionbad.svg') !important",
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});
const StartSurveyBtn = styled.button`
  margin: 20px auto;
  display: block;
  border: 0px;
  width: 200px;
  height: 50px;
  background: black;
  color:white;
  font-size: 1.1rem;
  border-radius: 20px;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
    color:black
  }
  transition:all 200ms linear;
`
const AnswerInput = styled.input`
  background: rgba(255, 255, 255, 0.2);
  height: 40px;
`

function Dosurvey() {
  const params = useParams();
  const [surveyDetail, setSurveyDetail] = useState(null) //axios를 통해 받아오는 설문 상세 정보 state
  const [loading, setLoading] = useState(false) // axios에서 정보를 받아오고 랜더링하기 위한 상태 state
  const [error, setError] = useState(null) // 에러발생시 에러를 저장할 수 있는 state
  const [showSurveyNumber, setShowSurveyNumber] = useState(0); //현재 답변중인 문항 번호

  const [result, setResult] = useState('')//설문의 결과를 배열로 저장하는 state
  const [inputs, setInputs] = useState(); // 현재 설문 문항에 대한 데이터를 가지고 있는 state!


  const [newSurveyDetail, setNewSurveyDetail] = useState(null)
  const [choiceQuestions, setChoiceQuestions] = useState(null)


  useEffect(() => {
    setLoading(true)
    const jwt = localStorage.getItem('jwt')
    axios.get(`/survey/${params.surveyCode}`, {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    })
      .then((res) => {
        console.log('처음에 데이터 불러오고 그다음에는 실행되면 안되는 useEffect')
        setLoading(false)
        setSurveyDetail(res.data.result)
        setNewSurveyDetail(res.data.result)
        setResult([]) // result 배열의 공간을 만들어준다.
        setChoiceQuestions(res.data.result.choiceQuestions)
      })
      .catch((Error) => {
        setError(Error)
      })
  }, [])


  useEffect(() => {
    console.log('inputs이 변화했습니다', inputs)
  }, [inputs])


  if (loading) return (
    <div class="tenor-gif-embed" data-postid="24452916" data-share-method="host" data-aspect-ratio="1.06312" data-width="100%"><a href="https://tenor.com/view/%EC%B6%98%EC%8B%9D%EC%9D%B4-%EC%B6%98%EC%8B%9D-chunsik-gif-24452916">춘식이 Chunsik GIF</a>from <a href="https://tenor.com/search/%EC%B6%98%EC%8B%9D%EC%9D%B4-gifs">춘식이 GIFs</a></div>
  )
  // axios response가 오기 전에 랜더링이 일어나면 오류가 발생한다. 
  //따라서 loading state로 밑에 본문이 랜더링이 되는것을 막고 loading이 false가 되면 위에 문장이 실행안되고
  // 아래에 본문return이 실행 될 것이다.s
  if (error) return (
    <div>에러 발생..{error}</div>
  )
  //에러가 있다면 에러 핸들링
  if (!surveyDetail) return (
    null
  )
  //surveyDetail 이 null이라면 아무것도 반환하지 않는다.


  const mkNewSurveyDetail = async () => {
    setSurveyDetail({
      ...surveyDetail,
      questions: [
        ...surveyDetail.questions,
        // ...choiceQuestions.map((item) => ({ questionTypeId: item.question.questionTypeId, name: item.question.name, desciption:item.question.dis  }))]
        ...choiceQuestions.map((item) => ({ ...item.question, mcitem: item.choices.map((mcitem) => (mcitem.name)) }))]
    })
  }


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
      if (result[showSurveyNumber - 1] === undefined) { // 필수답변은 아니지만 문항에 응답을 안했으면
        result[showSurveyNumber - 1] = null
      }
      console.log(result, '제출')
    }
  }

  const nextQuestion = () => {
    if (surveyDetail.questions[showSurveyNumber - 1].answerRequired) { // 필수문항이면
      if (showSurveyNumber < surveyDetail.questions.length && result[showSurveyNumber - 1] !== undefined) { //마지막 문항이 아니고 && 설문에 응답했으면
        setShowSurveyNumber(showSurveyNumber + 1) // 다음 문항으로 넘어가줘라
        if (result[showSurveyNumber] === undefined) { // 다음 문항에 내용이 아직 없다면
          setInputs('') // input창에 아무것도 안보여주고
        }
        else {
          setInputs(result[showSurveyNumber]) // inputs 값에 이미 답변한 내용을 보여줘라!
        }
      }
      else {
        alert('필수 문항입니다. 답변해주세요!')
      }
    }
    else {
      if (showSurveyNumber < surveyDetail.questions.length) { //필수 문항이 아님'
        if (result[showSurveyNumber - 1] === undefined) { // 문항 답변에 아무것도 없을 경우에
          result[showSurveyNumber - 1] = null // 널값을 집어넣고
          setShowSurveyNumber(showSurveyNumber + 1)//다음 문항으로 넘어간다
          if (result[showSurveyNumber] === undefined) { // 다음 문항에 내용이 아직 없다면
            setInputs('') // input창에 아무것도 안보여주고
          }
          else {
            setInputs(result[showSurveyNumber]) // inputs 값에 이미 답변한 내용을 보여줘라!
          }
        }
        else {
          setShowSurveyNumber(showSurveyNumber + 1) //답변이 있을경우 그냥 다음 문제로 넘어간다.
          if (result[showSurveyNumber] === undefined) { // 다음 문항에 내용이 아직 없다면
            setInputs('') // input창에 아무것도 안보여주고
          }
          else {
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

  const onChangeType1 = (e) => { // 장문 문항에 대한 핸들링
    let temparr = result
    temparr[showSurveyNumber - 1] = e.target.value
    setResult(temparr)
    setInputs(e.target.value)
  }

  const onChangeType2 = (e) => {// 단문 문항에 대한 핸들링
    let temparr = result
    temparr[showSurveyNumber - 1] = e.target.value
    setResult(temparr)
    setInputs(e.target.value)
  }

  const onChangeType3 = (e) => {
    console.log(e.target.value)
    let temparr = result
    temparr[showSurveyNumber - 1] = e.target.value
    setResult(temparr)
    setInputs(e.target.value)

  }

  const onChangeType5 = (e, value) => { // 감정바 문항에 대한 핸들링
    let temparr = result
    temparr[showSurveyNumber - 1] = value
    setResult(temparr)
    setInputs(value)
  }

  const onChangeType6 = (e) => { // 선형배율 문항에 대한 핸들링
    let tempArr = result
    tempArr[showSurveyNumber - 1] = e.target.name
    setInputs(e.target.name)
  }

  console.log()

  return (
    <BackgroundDiv>
      {showSurveyNumber === 0 //설문 시작화면 보여주기
        &&
        <StartCard>
          <QuestionTitle><span style={{ fontWeight: 'bold' }}>{surveyDetail.survey.name}</span>에 관한 설문입니다.</QuestionTitle>
          <QuestionTitle>설문 문항은 총 <span style={{ fontWeight: 'bold' }}>{surveyDetail.questions.length + surveyDetail.choiceQuestions.length}문항</span> 입니다. </QuestionTitle>
          <StartSurveyBtn onClick={startSurvey}>설문시작</StartSurveyBtn>
          <hr />
          <div>개발자 참고 공간 ↓</div>
          <div>설문번호 : {params.surveyId}</div>
          <button onClick={mkNewSurveyDetail}>객관식문제 choiceQuestions에서 questions로 파싱하기</button>

          <div>디자인작업 진행 10%, 로직 진행도 40%, 위에 NAV안나오게 해야함</div>
          {console.log(surveyDetail)}
          {console.log(newSurveyDetail)}
          {console.log(choiceQuestions)}
        </StartCard>
      }

      <div>
        {showSurveyNumber >= 1 //1번 문제부터 보여주기
          &&
          <SurveyCard>
            <QuestionTitle>{`${showSurveyNumber}. ${surveyDetail.questions[showSurveyNumber - 1].name}`}</QuestionTitle>
            <br />
            {surveyDetail.questions[showSurveyNumber - 1].questionTypeId === 1 && //1번 타입의 문항(장문) 경우 아래의 식을 수행
              <AnswerInput style={{ width: '100%', type: 'textarea' }} name={showSurveyNumber} onChange={onChangeType1} value={inputs}></AnswerInput>
            }
            {surveyDetail.questions[showSurveyNumber - 1].questionTypeId === 2 && //2번 타입의 문항(단문) 경우 아래의 식을 수행
              <AnswerInput style={{ width: '70%' }} name={showSurveyNumber} onChange={onChangeType2} value={inputs}></AnswerInput>
            }


            {surveyDetail.questions[showSurveyNumber - 1].questionTypeId === 3 && // 3번 타입의 객관식 문항 경우 아래의 식을 수행
              <FormControl>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  {surveyDetail.questions[showSurveyNumber - 1].mcitem.map((item, index) => (
                    <FormControlLabel checked={(index + 1) === Number(result[showSurveyNumber - 1])} value={index + 1} control={<Radio />} label={item} onClick={onChangeType3} />
                  ))}
                </RadioGroup>
              </FormControl>
            }


            {surveyDetail.questions[showSurveyNumber - 1].questionTypeId === 5 && //5번 타입의 문항(감정바) 경우 아래의 식을 수행
              <div style={{ width: '500px' }}>
                <EmotionSlider onChange={onChangeType5} valueLabelDisplay="auto" value={inputs} />
              </div>
            }



            {surveyDetail.questions[showSurveyNumber - 1].questionTypeId === 6 && //6번 타입의 문항(선형배율) 경우 아래의 식을 수행
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LinerBtn checked={inputs === '1' ? true : false} name='1' onClick={onChangeType6} >1<br /><span style={{ fontSize: '11px' }}>매우 그렇지 않다</span></LinerBtn>
                <LinerBtn checked={inputs === '2' ? true : false} name='2' onClick={onChangeType6}>2<br /><span style={{ fontSize: '11px' }}>그렇지 않다</span> </LinerBtn>
                <LinerBtn checked={inputs === '3' ? true : false} name='3' onClick={onChangeType6}>3<br /><span style={{ fontSize: '11px' }}>보통이다</span> </LinerBtn>
                <LinerBtn checked={inputs === '4' ? true : false} name='4' onClick={onChangeType6}>4<br /><span style={{ fontSize: '11px' }}>약간 그렇다</span></LinerBtn>
                <LinerBtn checked={inputs === '5' ? true : false} name='5' onClick={onChangeType6}>5<br /><span style={{ fontSize: '11px' }}>매우 그렇다</span> </LinerBtn>
              </div>

            }
            <br />
            {console.log(result)}
            <br />
            {showSurveyNumber === surveyDetail.questions.length // 설문의 마지막 문항일때 조건
              ?
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={prevQuestion}>이전문항</button>
                <button onClick={onSubmit}>제출하기{surveyDetail.questions.length}</button>
              </div>

              :
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={prevQuestion}>이전문항</button>
                <button onClick={nextQuestion}>다음문항</button>
              </div>
            }

            <hr />
            <div>개발자 참고 공간 ↓</div>
            <div>{`question타입 : ${surveyDetail.questions[showSurveyNumber - 1].questionTypeId}`}</div>
            <div>{`필수답변여부 : ${surveyDetail.questions[showSurveyNumber - 1].answerRequired}`}</div>

          </SurveyCard>}
      </div>
    </BackgroundDiv >
  );
}

export default Dosurvey;