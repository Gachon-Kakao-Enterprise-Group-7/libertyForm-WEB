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
import Slider from '@mui/material/Slider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from "react-modal";

import { ReactComponent as EmotionGood } from "../img/emotiongood.svg";
import { ReactComponent as EmotionBad } from "../img/emotionbad.svg";

const BackgroundDiv = styled.div`
  background: #00000026;
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
    color:white;
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
  background: rgba(255, 255, 255, 0.5);
  color:black;
  font-size: 1.1rem;
  border-radius: 20px;
  border : 1px solid black;
  &:hover {
    background: black;
    color:white;
  }
  transition:all 200ms linear;
`
const AnswerInput = styled.input`
  background: rgba(255, 255, 255, 0.2);
  height: 40px;
`
const ProgressBarDiv = styled.div`
  padding: 20px;
  width: 95%;
  margin: auto;
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
  cursor: pointer;
  svg {
    fill: #92929d;
    :hover {
      fill: #0062ff;
    }
  }
`
const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #171725;
  font-size: 24px;
  margin: 30px 0;
  margin-left: 10px;
  border-bottom: 1px solid #e2e2ea;
  height: 50px;
`

const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  width:100%;
  background-color: #ff7800;
  outline: none;
  cursor: pointer;
  color: white;
  height: 38px;
  border-radius: 20px;
  border: 1px solid #fc5a5a;
  :hover {
    color: #fc5a5a;
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
  const [inputs, setInputs] = useState(); // 현재 설문 문항에 대한 데이터를 가지고 있는 state!

  const [choiceQuestions, setChoiceQuestions] = useState(null) // 객관식 정보만 담고 있는 state

  const [openSubmitModal, setOpenSubmitModal] = useState(false)

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
    setShowSurveyNumber(1)
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
        case 4:
          console.log('4입니다!')
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
    await axios.post("/response/create", jsondata, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res)
        switch (res.data.code) {
          case 1000:
            alert('요청에 성공하였습니다.')
            document.location.href = '/'
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
    <BackgroundDiv>
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
          {console.log(surveyDetail)}
          {console.log(newSurveyDetail)}
          {console.log(sortedSurveyDetail)}
          {console.log(choiceQuestions)}

        </StartCard>
      }

      <div>
        {showSurveyNumber >= 1 //1번 문제부터 보여주기
          &&
          <>
            <ProgressBarDiv><ProgressBar completed={Math.round((result.length / sortedSurveyDetail.questions.length) * 100)} bgColor="#ff7800" labelColor="#f6f6f6" /></ProgressBarDiv>
            <SurveyCard>
              <QuestionTitle>{`${showSurveyNumber}. ${sortedSurveyDetail.questions[showSurveyNumber - 1].name}`}</QuestionTitle>
              <br />
              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 1 && //1번 타입의 문항(장문) 경우 아래의 식을 수행
                <AnswerInput style={{ width: '100%', type: 'textarea' }} name={showSurveyNumber} onChange={onChangeType1} value={inputs}></AnswerInput>
              }
              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 2 && //2번 타입의 문항(단문) 경우 아래의 식을 수행
                <AnswerInput style={{ width: '70%' }} name={showSurveyNumber} onChange={onChangeType2} value={inputs}></AnswerInput>
              }


              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 3 && // 3번 타입의 객관식 문항 경우 아래의 식을 수행
                <FormControl>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    {sortedSurveyDetail.questions[showSurveyNumber - 1].mcitem.map((item, index) => (
                      <FormControlLabel checked={(index + 1) === Number(result[showSurveyNumber - 1])} value={index + 1} control={<Radio />} label={item} onClick={onChangeType3} />
                    ))}
                  </RadioGroup>
                </FormControl>
              }


              {sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId === 5 && //5번 타입의 문항(감정바) 경우 아래의 식을 수행
                <div style={{ width: '500px' }}>
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
              <br />
              {showSurveyNumber === sortedSurveyDetail.questions.length // 설문의 마지막 문항일때 조건
                ?
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={prevQuestion}>이전문항</button>
                  <button onClick={onSubmit}>제출하기</button>
                </div>

                :
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={prevQuestion}>이전문항</button>
                  <button onClick={nextQuestion}>다음문항</button>
                </div>
              }

              <hr />
              <div>개발자 참고 공간 ↓</div>
              <div>{`question타입 : ${sortedSurveyDetail.questions[showSurveyNumber - 1].questionTypeId}`}</div>
              <div>{`필수답변여부 : ${sortedSurveyDetail.questions[showSurveyNumber - 1].answerRequired}`}</div>

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
          width: '50%',
          height: '400px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          borderRadius: '20px',
          padding: '20px 25px'
        }
      }}>

        <ModalHeader>
          <ModalDelete onClick={() => { setOpenSubmitModal(false) }}>X</ModalDelete>
        </ModalHeader>
        <ModalTitle>
          <span>응답을 제출하시겠습니까?</span>
        </ModalTitle>
        <ModalButton onClick={sendToServer}>제출하기</ModalButton>

      </Modal>
    </BackgroundDiv >
  );
}

export default Dosurvey;