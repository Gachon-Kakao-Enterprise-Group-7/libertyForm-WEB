// !작동방식
// 페이지가 로딩되면서 서버로부터 설문정보를 받아와 surveyDetail에 저장을 한다.
// surveyDetail은 객관식, 주관식이 분리되어있는 데이터 형태라 데이터 가공이 필요하다
// surveyDetail에 데이터가 저장되면 변화를 useEffect가 감지하고 newSurveyDetail에 객관식과 주관식을 합쳐서 저장하게 된다.
// newSurveyDetail의 변화 또한 useEffect가 감지하고 있다가 변화되면
// 질문의 number로 정렬을 해서 sortedSurveyDetail에 저장하고 이 데이터를 설문자가 응답할때 사용한다.

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useDidMountEffect from '../hooks/useDidMountEffect'; // 처음 렌더링을 막아주는 커스텀 훅
import styled from 'styled-components';
import Modal from "react-modal";

import Slider from '@mui/material/Slider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import ProgressBar from "@ramonak/react-progress-bar";

import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

import { ReactComponent as CloseModal } from ".././img/close.svg"
import { ReactComponent as EmotionVerybad } from "../img/emotion_verybad.svg";
import { ReactComponent as EmotionBad } from "../img/emotion_bad.svg";
import { ReactComponent as EmotionMedium } from "../img/emotion_medium.svg";
import { ReactComponent as EmotionGood } from "../img/emotion_good.svg";
import { ReactComponent as EmotionVerygood } from "../img/emotion_verygood.svg";


const SurveyFooter = styled.div`
  background:rgba(0,0,0,0.025);
	border-top: 1px solid rgba(0,0,0,0.1);
  width: 100%;
  align-self: flex-end;
  margin-top: auto;
  border-radius: 20px;
`


const SurveyNextButton = styled.button`
  background-color: white;
  outline: none;
  cursor: pointer;
  color: #252525;
  height: 50px;
  border: 1px solid rgba(0,0,0,0.25);
  border-radius: 5rem;
	padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  font-size:22px;
  :hover{
		cursor: pointer;
		background: #ECEFF1;
		border-color:rgba(0,0,0,0.25);
	}
`
const BackgroundDiv = styled.div`
  position: absolute;
  top:0px; // nav바 가려버림
  background: #e1e1e1;
  z-index: 0;
  width:100vw;
  height:100vh;
  min-height: 100vh; //가로축
  display : flex;
  align-items: center;
  justify-content: center;
    ::before {
        background-image: url(${props => props.thumbnailImgUrl});
        background-size: 1920px 1080px;
        opacity:0.9;
        width:100vw;
        height:100vh;
        z-index: -1;
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        position :absolute;
        content: "";
  }
`
const StartCard = styled.div`
    background-color: rgba(255, 255, 255, 0.9);
    color:black;
    width: 100vh;
    padding: 30px;
    height : 50vh;
    border-radius: 40px;
    text-align:center;

`
const SurveyCard = styled.div`
    background-color: rgba(255, 255, 255, 0.9);
    color:black;
    width: 90vh;
    min-height : 50vh;
    padding: 30px;
    border-radius: 40px;
    
    display: flex;
    flex-direction : column;
    flex:auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    
    
`
const QuestionTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
	padding: 1.5rem;
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
    color:white;
  }
`
const EmotionSlider = styled(Slider)({

  color: '#52af77 !important', //important를 이용해서 css우선순위를 1순위로 끌어올렸다.
  height: 8,
  position: 'relative',
  '& .MuiSlider-track': {
    border: 'none',
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

const EmotionText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom :  20px;
  justify-content: space-between;
  width : 100%;
  >strong{
    color: #2B3044;
    display: block;
    font-weight: 500;
    font-size: 25px;
  }
  >div{
    display : flex; 
    justify-content: flex-start;
  
  >text{
    white-space:nowrap;
    color: #BBC1E1;
    font-size: 20px;
    font-weight: 500;
    list-style: none;
    position: relative;
    text-align: right;
  }
  >text{

    list-style: none;
    position: relative;
    text-align: left;
    margin-right : 10px;
    padding-top: 5px;
  }

}
`

const StartSurveyBtn = styled.button`
  margin: 20px auto;
  display: block;
  border: 0px;
  width: 200px;
  height: 50px;
  background: rgba(255, 255, 255, 0.5);
  color:black;
  font-size: 1.1rem;
  border-radius: 20px;
  border : 2px solid black;
  &:hover {
    background: black;
    color:white;
  }
  transition:all 200ms linear;
`


const AnswerInput = styled.input`
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  margin: auto 3%; //top left
  padding: 0px 0px 10px;
  border: none;
  outline: none;
  border-bottom : 3px solid black;
  font-size: 26px;
  white-space:pre-line;

  ::placeholder {
       color: #D3D3D3;
       font-size:24px;
   }

   :focus{
  border-bottom: 3px solid #ffcd23;
  }
`
const ProgressBarDiv = styled.div`
  padding: 20px;
  width: 95%;
  margin: auto;
`

const CloseModalSvg = styled(CloseModal)`
    fill: #92929d;
    width:30px;
    height:30px;
    &:hover {
      fill: #ff7800;
    }
`
const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #92929d;
  font-size: 14px;
`
const ModalDelete = styled.button`
  background-color: white;
  border: none;
  outline: none;
`


const ModalDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 10px;
  color: #171725;
  font-size: 16px;
`
const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #171725;
  font-size: 24px;
  margin: 20px 0;
  margin-left: 10px;
  margin-right: 0px;
  border-bottom: 1px solid #e2e2ea;
  height: 50px;

  & h4 {
    padding-bottom: 10px;
    font-weight: bold;
  }
`

const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-left: 10px;
  width: 98%;
  background-color: #ff7800;
  outline: none;
  cursor: pointer;
  color: white;
  height: 38px;
  border-radius: 20px;
  border: 1px solid #ff7800;
  :hover {
    color: #ff7800;
    background-color: white;
  }
`


const OptionWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 12px;
  flex-grow: 1;
  `

const OptionContainer = styled.div`
  border-radius: 10px;
  margin: 0 18px;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0,0,0,0.85);
  border: transparent 1px solid;

  &.is-selected {
    border-color: rgba(black,0.25);
    background-color: white;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: scaleX(0.95);
    border-color: rgba(0, 0, 0, 0.1);
    background-color: white;
  }
`


function Dosurvey() {

  const params = useParams();
  const [surveyDetail, setSurveyDetail] = useState(null) //axios를 통해 받아오는 설문 상세 정보 state [1차 데이터]
  const [newSurveyDetail, setNewSurveyDetail] = useState(null) // 객관+주관 합친 데이터 [2차 데이터]
  const [sortedSurveyDetail, setSortedSurveyDetail] = useState(null) // 문제 순서(number)에 따라 정렬된 데이터 [3차 데이터, 실제 설문에 쓰일 데이터]
  const [postData, setPostData] = useState({ // 피설문자의 설문 응답 결과를 서버에 보내기 위해 변환한 형태의 데이터
    multipleChoiceResponse: [], // 객관식 다중선택
    numericResponse: [], // 감정바
    singleChoiceResponse: [], // 객관식 단일선택
    textResponse: [], // 단문, 장문식
    surveyId: '',
  })


  const [loading, setLoading] = useState(false) // axios에서 정보를 받아오고 랜더링하기 위한 상태 state
  const [error, setError] = useState(null) // 에러발생시 에러를 저장할 수 있는 state
  const [showSurveyNumber, setShowSurveyNumber] = useState(0); //현재 답변중인 문항 번호

  const [result, setResult] = useState('')//설문의 결과를 배열로 저장하는 state
  const [inputs, setInputs] = useState([]); // 현재 설문 문항에 대한 데이터를 가지고 있는 state!

  const [choiceQuestions, setChoiceQuestions] = useState(null) // 객관식 정보만 담고 있는 state

  const [openSubmitModal, setOpenSubmitModal] = useState(false)

  // const now = new Date()
  // const expirationDate = new Date(surveyDetail.survey.expirationDate)

  // console.log(now, '지금')
  // console.log(expirationDate, '만료기간')
  // console.log(expirationDate - now - 32400000)



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

        setSurveyDetail(res.data.result)
        setNewSurveyDetail(res.data.result)
        setResult([]) // result 배열의 공간을 만들어준다.
        setChoiceQuestions(res.data.result.choiceQuestions)

      })
      .catch((Error) => {
        setError(Error)
      })
  }, [])


  useDidMountEffect(() => { // surveyDetail -> newSurveyDetail (변경내용 : 객관식, 주관식을 합쳐준다.)
    setNewSurveyDetail({
      ...surveyDetail,
      questions: [
        ...surveyDetail.questions,
        // ...choiceQuestions.map((item) => ({ questionTypeId: item.question.questionTypeId, name: item.question.name, desciption:item.question.dis  }))]
        ...choiceQuestions.map((item) => ({ ...item.question, mcitem: item.choices.map((mcitem) => (mcitem.name)) }))]
    })
  }, [surveyDetail]);


  useDidMountEffect(() => { // newSurveyDetail -> sortedSurveydetail (변경내용 : 합쳐준 설문정보를 number에 따라 정렬한다.)
    setSortedSurveyDetail({
      ...newSurveyDetail,
      questions: newSurveyDetail.questions.sort(function (a, b) {
        return a.number - b.number
      }) // 객체의 number를 비교해서 오름차순으로 정렬한다.
    })
    setLoading(false) // 여기까지 작업이 끝나면 이제 로딩을 끝내준다.
  }, [newSurveyDetail]);



  useEffect(() => {
    console.log('inputs이 변화했습니다', inputs)
  }, [inputs])


  useEffect(() => {
    console.log('result가 변화했습니다.', result)
  }, [result])

  useEffect(() => { //postData가 바뀔때마다 알려줄것!
    console.log(postData, 'postData')
  }, [postData])


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
    const remainTime = new Date(surveyDetail.survey.expirationDate) - new Date() + 5400000 // 5400000 = 15시간
    if (remainTime > 0) {
      setShowSurveyNumber(1)
    }
    else {
      alert('만료된 설문입니다!')
    }
  }

  const dataConvert = () => {
    setPostData((prev) => ({ ...prev, surveyId: sortedSurveyDetail.survey.surveyId })) //surveyID postData에 저장!
    sortedSurveyDetail.questions.forEach((survey, index) => {
      switch (survey.questionTypeId) { // switch문의 조건에 맞게 응답들을 postData에 저장!
        case 1: // 장문형
          setPostData((prev) => ({ ...prev, textResponse: [...prev.textResponse, { questionNumber: (index + 1), type: 'LONG_TEXT', value: result[index] }] }))
          break;
        case 2: // 단문형
          setPostData((prev) => ({ ...prev, textResponse: [...prev.textResponse, { questionNumber: (index + 1), type: 'SHORT_TEXT', value: result[index] }] }))
          break;
        case 3: // 객관식(단일)
          setPostData((prev) => ({ ...prev, singleChoiceResponse: [...prev.singleChoiceResponse, { questionNumber: (index + 1), choiceNumber: result[index] }] }))
          break;
        case 4: // 객관식(복수)
          const choices = result[index].map((choice, index) => (
            {
              "choiceNumber": choice
            }
          ))
          setPostData((prev) => ({ ...prev, multipleChoiceResponse: [...prev.multipleChoiceResponse, { questionNumber: (index + 1), choices }] }))
          break;
        case 5: // 감정바
          setPostData((prev) => ({ ...prev, numericResponse: [...prev.numericResponse, { questionNumber: (index + 1), type: 'EMOTION_BAR', value: result[index] }] }))
          break;
        case 6: // 선형배율
          setPostData((prev) => ({ ...prev, numericResponse: [...prev.numericResponse, { questionNumber: (index + 1), type: 'LINEAR_ALGEBRAS', value: result[index] }] }))
          break;
        default:
          break;
      }
    });
  }

  const sendToServer = async () => {
    const jsondata = JSON.stringify(postData)
    console.log(jsondata)
    await axios.post("/response/create", jsondata, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res)
        switch (res.data.code) {
          case 1000:
            alert('요청에 성공하였습니다.')
            document.location.href = '/surveyend'
            break;
          case 2013:
            alert('존재하지 않는 설문지입니다.')
            break;
          case 2015:
            alert('존재하지 않는 질문입니다.')
            break;
          case 2016:
            alert('존재하지 않는 선택지입니다.')
            break;
          default:
            break;
        }
      })
      .catch((Error) => { console.log(Error) })

  }


  const onSubmit = () => {
    if (sortedSurveyDetail.questions[showSurveyNumber - 1].answerRequired) { // 필수문항이면
      if ((result[showSurveyNumber - 1] != null)) { // 문항에 응답했으면
        console.log(result, '제출!')
        dataConvert()
        setOpenSubmitModal(true)

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
      dataConvert()
      setOpenSubmitModal(true)

    }
  }

  const nextQuestion = () => {
    if (sortedSurveyDetail.questions[showSurveyNumber - 1].answerRequired) { // 필수문항이면
      if (showSurveyNumber < sortedSurveyDetail.questions.length && result[showSurveyNumber - 1] !== undefined) { //마지막 문항이 아니고 && 설문에 응답했으면
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
      if (showSurveyNumber < sortedSurveyDetail.questions.length) { //필수 문항이 아님'
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

  const onChangeType4 = (e) => {
    console.log(e.target.checked)

    if (e.target.checked) {
      let temparr = result
      console.log(result)
      if (result[showSurveyNumber - 1] === undefined) { // 기존 저장된 정보가 없으면 그냥 적는다
        temparr[showSurveyNumber - 1] = [e.target.name]
        setResult(temparr)
        setInputs(temparr[showSurveyNumber - 1])
      }
      else { // 기존에 저장된 정보가 있으면 불러와서 덮어 씌운다
        temparr[showSurveyNumber - 1] = [...new Set([...result[showSurveyNumber - 1], e.target.name])]
        setInputs((prev) => ([...new Set([...prev, e.target.name])]))
      }
      setResult(temparr)
      setInputs(temparr[showSurveyNumber - 1])
    }
    else { // e.target.checked가 false 즉, 체크박스 선택이 해제 될때 실행된다.
      let temparr = result
      temparr[showSurveyNumber - 1].pop(e.target.name) // e.target.name에 해당하는 요소를 제거한다.
      setResult(temparr)
      setInputs(temparr[showSurveyNumber - 1])
    }
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

  return (
    <BackgroundDiv thumbnailImgUrl={sortedSurveyDetail.survey.thumbnailImgUrl}>
      {showSurveyNumber === 0 //설문 시작화면 보여주기
        &&
        <StartCard>
          <QuestionTitle><span style={{ fontWeight: 'bold' }}>{sortedSurveyDetail.survey.name}</span>에 관한 설문입니다.</QuestionTitle>
          <QuestionTitle>설문 문항은 총 <span style={{ fontWeight: 'bold' }}>{sortedSurveyDetail.questions.length}문항</span> 입니다. </QuestionTitle>
          <StartSurveyBtn onClick={startSurvey}>설문시작</StartSurveyBtn>
          <hr />
          <div>개발자 참고 공간 ↓</div>
          <div>설문번호 : {params.surveyId}</div>
          <button onClick={mkNewSurveyDetail}>객관식문제 choiceQuestions에서 questions로 파싱하기</button>

          <div>디자인작업 진행 10%, 로직 진행도 40%, 위에 NAV안나오게 해야함</div>
          {/* {console.log(surveyDetail)} */}
          {/* {console.log(newSurveyDetail)} */}
          {console.log(sortedSurveyDetail)}
          {/* {console.log(choiceQuestions)} */}

        </StartCard>
      }

      <div>
        {showSurveyNumber >= 1 //1번 문제부터 보여주기
          &&
          <>
            <ProgressBarDiv><ProgressBar completed={Math.round((result.length / sortedSurveyDetail.questions.length) * 100)} bgColor="#ff7800" labelColor="#f6f6f6" /></ProgressBarDiv>
            <SurveyCard>
              <QuestionTitle>{`${showSurveyNumber}. ${sortedSurveyDetail.questions[showSurveyNumber - 1].name}`} {sortedSurveyDetail.questions[showSurveyNumber - 1].answerRequired && <span style={{ color: 'red', paddingLeft: '0.25em' }} aria-hidden="true">*</span>}</QuestionTitle>
              <br />
              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 1 && //1번 타입의 문항(장문) 경우 아래의 식을 수행

                <AnswerInput placeholder={sortedSurveyDetail.questions[showSurveyNumber - 1].description} style={{ width: '90%', type: 'textarea' }} name={showSurveyNumber} onChange={onChangeType1} value={inputs}></AnswerInput>

              }
              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 2 && //2번 타입의 문항(단문) 경우 아래의 식을 수행
                <AnswerInput placeholder={sortedSurveyDetail.questions[showSurveyNumber - 1].description} style={{ width: '60%' }} name={showSurveyNumber} onChange={onChangeType2} value={inputs}></AnswerInput>
              }


              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 3 && // 3번 타입의 객관식 문항 경우 아래의 식을 수행
                <FormControl>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    {sortedSurveyDetail.questions[showSurveyNumber - 1].mcitem.map((item, index) => (
                      <OptionWrapper onClick={onChangeType3}>
                        <OptionContainer>
                          <FormControlLabel sx={{ width: 800, p: 1 }} checked={(index + 1) === Number(result[showSurveyNumber - 1])} value={index + 1} control={<Radio />} label={item} onClick={onChangeType3} />
                        </OptionContainer>
                      </OptionWrapper>
                    ))}
                  </RadioGroup>
                </FormControl>
              }
              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 4 && // 3번 타입의 객관식 문항 경우 아래의 식을 수행
                <>
                  <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                      {sortedSurveyDetail.questions[showSurveyNumber - 1].mcitem.map((item, index) => (
                        <FormControlLabel
                          control={
                            <Checkbox onChange={onChangeType4} name={index + 1} /> //여기 checked로직 잘 짜보자.... 제발 ㅠㅠㅠ
                          }
                          label={item}
                        />
                      ))}


                    </FormGroup>
                  </FormControl>
                </>
              }

              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 5 && //5번 타입의 문항(감정바) 경우 아래의 식을 수행

                <div style={{ width: '60vh', margin: 'auto' }}>
                  <EmotionText>
                    <strong>감정을 직접 표현해보세요</strong>

                    <div>


                      <text>
                        {inputs >= 0 && inputs < 20 && '매우 나쁨'}
                        {inputs >= 20 && inputs < 40 && '나쁨'}
                        {inputs >= 40 && inputs < 60 && '보통'}
                        {inputs >= 60 && inputs < 80 && '좋음'}
                        {inputs >= 80 && inputs <= 100 && '매우좋음'}
                      </text>

                      <a>
                        {inputs >= 0 && inputs < 20 && <EmotionVerybad width='40px' height='40px' />}
                        {inputs >= 20 && inputs < 40 && <EmotionBad width='40px' height='40px' />}
                        {inputs >= 40 && inputs < 60 && <EmotionMedium width='40px' height='40px' />}
                        {inputs >= 60 && inputs < 80 && <EmotionGood width='40px' height='40px' />}
                        {inputs >= 80 && inputs <= 100 && <EmotionVerygood width='40px' height='40px' />}
                      </a>

                    </div>
                  </EmotionText>
                  <EmotionSlider onChange={onChangeType5} valueLabelDisplay="auto" value={inputs} />
                </div>
              }



              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 6 && //6번 타입의 문항(선형배율) 경우 아래의 식을 수행
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
              {/* <hr />
              <div>개발자 참고 공간 ↓</div>
              <div>{`question타입 : ${sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId}`}</div>
              <div>{`필수답변여부 : ${sortedSurveyDetail.questions[showSurveyNumber - 1].answerRequired}`}</div> */}

              <br />
              {showSurveyNumber === sortedSurveyDetail.questions.length // 설문의 마지막 문항일때 조건
                ?
                <SurveyFooter>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 25px' }}>
                    <SurveyNextButton onClick={prevQuestion}>이전문항</SurveyNextButton>
                    <SurveyNextButton onClick={onSubmit}>제출하기</SurveyNextButton>
                  </div>
                </SurveyFooter>
                :
                <SurveyFooter>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 25px' }}>
                    <SurveyNextButton onClick={prevQuestion}>이전문항</SurveyNextButton>
                    <SurveyNextButton onClick={nextQuestion}>다음문항</SurveyNextButton>
                  </div>
                </SurveyFooter>
              }

            </SurveyCard>

          </>}
      </div>
      <Modal isOpen={openSubmitModal} style={{ //설문 링크 생성에 대한 모달
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',

        },
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          height: '300px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'hidden',
          outline: 'none',
          borderRadius: '20px',
          padding: '20px 25px'
        }
      }}>

        <ModalHeader>
          <ModalDelete onClick={() => { setOpenSubmitModal(false) }}><CloseModalSvg /></ModalDelete>
        </ModalHeader>
        <ModalTitle><h4>응답 제출</h4></ModalTitle>
        <ModalDescription>응답을 제출하시겠습니까?</ModalDescription>
        <ModalButton onClick={sendToServer}>제출하기</ModalButton>

      </Modal>
    </BackgroundDiv >
  );
}

export default Dosurvey;