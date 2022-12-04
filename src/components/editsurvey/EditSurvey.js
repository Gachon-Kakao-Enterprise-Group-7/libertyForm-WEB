import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Modal from "react-modal";

// mui import
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';

import { ReactComponent as CloseModal } from "svg/close.svg"
import { ReactComponent as UploadSvg } from "svg/upload.svg"
import { ReactComponent as DragSvg } from "svg/drag.svg"
import useDidMountEffect from 'hooks/useDidMountEffect'; // 처음 렌더링을 막아주는 커스텀 훅


import DatePicker from "react-datepicker";//리액트 캘린더 라이브러리
import "react-datepicker/dist/react-datepicker.css"; //캘린더 css
import { ko } from 'date-fns/esm/locale'; // 캘린더 라이브러리 한글화
import Swal from 'sweetalert2';





const DragSvgWrapper = styled(DragSvg)`
    margin-right: 5px;
    width:20px;
    height:20px;
    float:right;
    /* &:hover {
      fill: #ff7800;
    } */
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
`

const CloseModalSvg = styled(CloseModal)`
    fill: #92929d;
    width:30px;
    height:30px;
    &:hover {
      fill: #ff7800;
    }
`
const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #171725;
  font-size: 24px;
  margin: 20px 0;
  margin-left: 10px;
  border-bottom: 1px solid #e2e2ea;
  height: 50px;

  & h4 {
    padding-bottom: 10px;
    font-weight: bold;
  }
`
const ModalDescription = styled.span`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 10px;
  color: #171725;
  font-size: 16px;
`
const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  width:100%;
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

const Surveybutton = styled.button`
    font-weight: bold;
    width: 220px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #ff7800;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    margin-top: 80px;
`


const BlockDiv = styled.div`
    background-color: white;
    margin: auto;
    margin-top: 2vw;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-top : 20px solid #fff9df;
    width : 80%;
    border-radius: 1rem;
    overflow:hidden; // overflow, height : div안의 컨텐츠의 크기에 따라 height를 조절
	height:auto;
    border-top : 20px solid #fff9df;
    transition:all 200ms linear;

    :hover{
        background-color: #f7f7f7;
    }
`
const ItemDiv = styled.div`
    overflow:hidden; // overflow, height : div안의 컨텐츠의 크기에 따라 height를 조절
	height:auto;
    padding: 0vw 1vw;
    margin-top: 0.5vw;
`
const MainItemDiv = styled.div`
    overflow:hidden; // overflow, height : div안의 컨텐츠의 크기에 따라 height를 조절
	/* height:auto; */
    padding: 1vw 2vw;
    margin-top: 1vw;
    width : 100%;
    display : flex;
    justify-content: space-between;
    justify-content: center;
    flex-wrap: wrap;
    margin-left:5px;
    margin-top:5px;
    margin-bottom:5px;
    padding-bottom: 4px; 
`

const FuncDiv = styled.div`
    width: 100%;
    margin: 3vw auto;
    text-align: right;
`
const NumberingDiv = styled.div`
    text-align: center;
    font-family: 'RobotoMono', sans-serif;
    font-size: 1.5rem;
    display: inline-block;
`
const StyledLi = styled.li`
    :hover{
        color:red;
        font-weight: bold;
    }
    cursor: pointer;
    counter-increment: item;
    margin-bottom: 5px;
    width: fit-content;
    ::before{
        margin: 0.15rem;
        content: counter(item);
        border-radius: 0 50px 50px 50px;
        color: #fdfdfd;
        background: #ff7800 linear-gradient(to bottom right, #ff7800 25%, #ffcd00);
        text-shadow: 0 0 2px #ff7800;
        width: 1.5em;
        text-align: center;
        display: inline-block;
    }
    border-top-left-radius: 3px;
    transition:all 100ms linear;
`
const StyledOl = styled.ol`
    list-style: none;
    counter-reset: item;
    padding-left: 0px;
    margin-top: 0.5rem;

`
const McitemAddBtn = styled.button`
    width:10%;
    :hover{
        background: #7f7f7f;
        color: white;
    }
    :active{
        background-color: black;
        color:white;
    }
    border: 2px solid black;
    background-color: white;
    color: black;
    border-color: #cfcfcf;
    transition:all 200ms linear;
`
const StyledDatePicker = styled(DatePicker)`
    margin-top: 1.5rem;
    width: 70%;
    height: 42px;
    box-sizing: border-box;
    padding: 8px 20px;
    border-radius: 4px;
    font-size: 12px;
`

const TextInput = styled.input`
  position: relative;
  border: none;
  outline: none;
  border-bottom : 2px solid black;
  width: 100%; 
  margin-bottom: 5px;
  font-size: 20px;
  /* white-space:pre-line; */
  background-color: transparent;
   :focus{
  border-bottom: 3px solid #ffcd23;
  }
`

const ImageUpload = styled.div`
    padding: 1rem;
    display: inline-flex;
    justify-content: center ;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
	min-width : 30vh;
    width:50%;
    height : 50vh;
`

const TextUpload = styled.div` 
    display: flex;
    justify-content: space-between ;
    flex-direction: column;
    padding: 3rem 1rem 3rem 5rem ;
    width : 50%;
    min-width : 30vh;
    height : 50vh;
    background-color : transparent;
`

const PreviewImg = styled.div`
    background: #e1e1e1;
    background-image: url(${(props) => props.imgFileSrc});
    background-size: cover;
    width: 425px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid #c4c4c4;
    border-radius: 10px;
    position: relative;
    z-index: 1;
`
const Triangle = styled.div`
    width: 0px;
    height: 0px;
    border-bottom: 70px solid #e1e1e1;
    border-left: 36px solid transparent;
    border-right: 36px solid transparent;
    position: relative;
    bottom: 20px;
    z-index: 0;
`

const PreviewCard = styled.div`
    background-color: #ffffffe0;
    border-radius: 10px;
    width: 230px;
    height: 125px;
    text-align: center;
    z-index: 1;
   
`
const PreviewCardDefault = styled.div`
    background-color: #ffffffe0;
    border-radius: 10px;
    width: 230px;
    height: 125px;
    text-align: center;
    padding: 50px;
    font-weight: bold;
   
`
const PreviewText = styled.div`
    width: 100%;
    padding: 0px 20px;
    font-size: 0.7rem;
    margin: auto;
    font-weight: bold;
`
const PreviewButton = styled.button`
    font-size: 0.5rem;
    border: 0px;
    border-radius: 5px;
    margin: auto;
    margin-top: 20px;
    background-color: #e1e1e1;
`

function EditSurvey() {

    const [loading, setLoading] = useState(false);
    const [surveyDetail, setSurveyDetail] = useState(false)
    const surveyCode = useParams().surveyCode;
    
    const [surveyId, setSurveyId] = useState('')
    const [title, setTitle] = useState('') // 설문 이름에 대한 useState
    const [description, setDescription] = useState('')
    const [multiChoiceItem, setMultiChoiceItem] = useState('') // 객관식 항목추가할때 항목 하나하나를 임시로 가지고 있는 State
    const [expireDate, setExpireDate] = useState('') // 만료 날짜를 설정하는 State
    const [convertedDate, setConvertedDate] = useState(null) // 백엔드에 보내지는 만료날짜
    const [survey, setSurvey] = useState() // 현재 만들고 있는 survey에 대한 정보를 담고있음
    const [modalOpen, setModalOpen] = useState(false)
    const [imgFileSrc, setImgFileSrc] = useState('')
    const id = useRef(0)
    const [qLength, setQlength] = useState(0)
    const [postData, setPostData] = useState({
        survey: {
            name: "", // 설문 이름
            description: "", // 설문 추가 설명
            expirationDate: '', //설문 마감 날짜
            surveyId:''
        },
        questions: [
            // { //이 부분은 계속 누적하는 부분이라 기본값이 있으면 안된다.
            //     questionTypeId: '', // 질문 타입
            //     name: '', // 질문 이름
            //     description: '',//추가 설명
            //     number: '',//질문 번호
            //     backgroundImgUrl: '',
            //     questionImgUrl: '',
            //     answerRequired: '',
            // 
        ],
        choiceQuestions: [
            // {
            //     choices: [
            //         {
            //             name: '', //객관식 선택부분 이름
            //             number: '' //객관식 선택 번호
            //         }
            //     ],
            //     qeustion: {
            //         questionTypeId: '',
            //         answerRequired: '', // 필수답변 여부
            //         backgroundImgUrl: '',
            //         questionImgUrl: '',
            //         name: '', // 질문 이름
            //         description: '',
            //         number: ''//질문 번호
            //     }
            // }
        ]

    })


    useEffect(() => { // 처음에 서버에서 받아오는 설문 상세 정보!
        setLoading(true)
        const jwt = localStorage.getItem('jwt')
        axios.get(`${process.env.REACT_APP_DB_HOST}/survey/${surveyCode}`, {
          headers: {
            Authorization: 'Bearer ' + jwt
          }
        }) 
          .then((res) => {
            switch(res.data.code){
                case 1000:
                    const choiceQuestions = res.data.result.choiceQuestions.map((item)=>( // choiceQuestions 데이터 전처리 과정
                        {
                            ...item.question, choices:item.choices
                        }
                    ))
                    setSurveyDetail((prev)=>({
                        survey:res.data.result.survey,
                        questions:[...res.data.result.questions, ...choiceQuestions].sort(function (a, b) {return a.number - b.number}) // res.data에 있는 객관식과 주관식을 하나의 배열로 합치고, 문제 번호순으로 정렬
                    }))
                    
                    setTitle(res.data.result.survey.name)
                    setDescription(res.data.result.survey.description)
                    setExpireDate(new Date(res.data.result.survey.expirationDate))
                    setConvertedDate(res.data.result.survey.expirationDate)
                    setImgFileSrc(res.data.result.survey.thumbnailImgUrl)
                    setSurveyId(res.data.result.survey.surveyId)
                    setQlength(res.data.result.choiceQuestions.length + res.data.result.questions.length)
                    setLoading(false)
                    break;
                default:
                    console.log(res.data)
                    break;
            }
          })
          .catch((Error) => {
            console.log(Error)
          })
      }, [])


    useEffect(()=>{
        console.log(survey)
    },[survey])

    useDidMountEffect(()=>{ // server to react 데이터로 변환
       console.log('처음에 실행되고 또 실행되면 대참사')
       id.current = surveyDetail.questions.length +1
       setSurvey(surveyDetail.questions.map((question, index)=>(
        question.questionTypeId === 3 || question.questionTypeId ===4
        ?{
            id:question.number,
            questionId : question.questionId,
            q:question.name,
            type:question.questionTypeId,
            required:question.answerRequired,
            mcitem:question.choices.map((item)=>(
                {name : item.name, choiceId: item.choiceId}
            ))
        }
        :{
            id:question.number,
            questionId : question.questionId,
            q:question.name,
            type:question.questionTypeId,
            required:question.answerRequired,
            description: question.description? question.description:null 
        }
        
    ))) 

      },[surveyDetail])
    const changeDate = (date) => { // 날짜 형식을 백엔드에 보내줘야 할 양식으로 변환하는 함수
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        setExpireDate(date) // 사용자 화면에 보여지기 위한 Date State
        setConvertedDate(date.getFullYear() + '-' + month + '-' + day) // 백엔드에 보내기 위한 Date
    }

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "unset";
    };
    

    const saveData = () => {
        console.log('saveData함수 실행됨')
        setPostData((
            {
                ...postData,
                survey: {
                    ...postData.survey,
                    name: title,
                    description: description,
                    expirationDate: convertedDate,
                    surveyId:surveyId
                },
                choiceQuestions: [
                    ...postData.choiceQuestions,
                    ...survey.filter((item) => (item.type == '3' || item.type == '4')).map((item, index) => ( //여기 괄호 안이 한질문임!
                        {
                            choices:
                                item.mcitem.map((mcitem, index) => (
                                    {
                                        name: mcitem.name,
                                        number: index+1,
                                        choiceId : mcitem.choiceId
                                    }
                                ))
                            ,
                            question: {
                                questionTypeId: item.type,
                                questionId : item.questionId,
                                name: item.q,
                                number : String(item.id),
                                answerRequired: item.required
                            }
                        }
                    ))
                ],
                questions: [
                    ...postData.questions,
                    ...survey.filter((item) => (item.type != '3' && item.type != '4')).map((item, index) => ( // 필터로 객관식 아닌 질문들만 걸러서 questions에 넣어준다.
                        {
                            questionTypeId: item.type,
                            questionId : item.questionId,
                            name: item.q,
                            description: item.description,
                            number : String(item.id),
                            answerRequired: item.required
                        }

                    ))
                ]
            }
        ))

    }


    const onChange = (e) => {
        const targetId = parseInt(e.target.dataset.id) //dataset.id를 통해서 밑에 input태그의 data-id의 값을 가져온다. //https://codechasseur.tistory.com/75
        const q = e.target.value //사용자가 input태그에 입력한 값
        setSurvey(survey.map((item) => item.id === targetId +1 ? { ...item, q: q } : item)) // 사용자가 값을 입력하게되면 onChange함수 실행되고 setSurvey함수를 통해 survey를 map해서 item의 id와 targetid가 같으면 q를 input태그에 입력한 값으로 한다.
    }
    const onChangeDescription = (e) => { //설문 질문에 대한 description
        const targetId = parseInt(e.target.dataset.id) //dataset.id를 통해서 밑에 input태그의 data-id의 값을 가져온다. //https://codechasseur.tistory.com/75
        const description = e.target.value //사용자가 input태그에 입력한 값
        setSurvey(survey.map((item) => item.id === targetId+1 ? { ...item, description: description } : item)) // 사용자가 값을 입력하게되면 onChange함수 실행되고 setSurvey함수를 통해 survey를 map해서 item의 id와 targetid가 같으면 q를 input태그에 입력한 값으로 한다.
    }


    const addMcItem = (e) => {
        
        const targetId = parseInt(e.target.dataset.id)
        const mcitem = multiChoiceItem
        if (mcitem.length > 0) {
            setSurvey(survey.map((item) => item.id === targetId+1 ? { ...item, mcitem: [...item.mcitem, {name:mcitem, choiceId:-1}] } : item))
            setMultiChoiceItem('')
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: '1글자 이상 입력하세요',
                icon: 'error',
                confirmButtonText: '확인'
            })
        }

    }

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') { // Enter 입력이 되면 클릭 이벤트 실행?

            const targetId = parseInt(e.target.dataset.id)
            const mcitem = multiChoiceItem
            if (mcitem.length > 0) {
                setSurvey(survey.map((item) => item.id === targetId+1 ? { ...item, mcitem: [...item.mcitem, {name:mcitem, choiceId:-1}] } : item))
                setMultiChoiceItem('')
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: '1글자 이상 입력하세요',
                    icon: 'error',
                    confirmButtonText: '확인'
                })
            }
        }
    }


    const onToggle = (e) => {
        const targetId = parseInt(e.target.name)
        setSurvey(survey.map((item) => item.id === targetId+1 ? { ...item, required: !item.required } : item))
    }


    const delMcItem = (e) => {
        const index = parseInt(e.target.dataset.id)
        const mcitemIndex = e.target.value
        const temp = survey[index].mcitem
        temp.splice(mcitemIndex, 1)

        setSurvey(survey.map((item) => item.id === index+1 ? { ...item, mcitem: temp } : item))
    }



    const requestSubmit = () => {
        if (title.length < 1) { // 설문 제목의 길이가 0일때
            Swal.fire({
                title: 'Error!',
                text: '설문 이름을 입력하세요',
                icon: 'error',
                confirmButtonText: '확인'
            })
        }
        else if (convertedDate == null) { // 저장된 만료날짜가 없을때
            Swal.fire({
                title: 'Error!',
                text: '마감날짜를 설정하세요',
                icon: 'error',
                confirmButtonText: '확인'
            })
        }
        else if (survey[0].q.length < 1) { // 첫번째 질문의 길이가 0일때(객관식 제외하고 나머지)
            Swal.fire({
                title: 'Error!',
                text: '최소 1개의 질문을 생성하세요',
                icon: 'error',
                confirmButtonText: '확인'
            })
        }
        else if (survey[0].type === '3' && survey[0].mcitem.length === 0) { //객관식일때
            Swal.fire({
                title: 'Error!',
                text: '최소 1개의 선택지를 생성하세요',
                icon: 'error',
                confirmButtonText: '확인'
            })
        }
        else {
            openModal()
            saveData()
        }
    }



    const sendToServer = async () => {

        const jwt = localStorage.getItem('jwt')
        
        await axios.patch(`${process.env.REACT_APP_DB_HOST}/survey/modify`, postData, { headers: { Authorization: 'Bearer ' + jwt } })
            .then((res) => {
                console.log(res.data.code)
                switch (res.data.code) {
                    case 2500:
                        document.location.href = '/home/dashboard'
                        break;
                    case 2010:
                    case 2011:
                    case 2012:
                    case 2013:
                    case 2014:
                    case 2015:
                    case 2019:
                    case 4001:
                    case 4002:
                        console.log('오류입니다. 자세한 정보는 스웨거 확인')
                        break;
                    default:
                        console.log(res.data.code)
                        break;
                }
            })
            .catch((Error) => {
                console.log(Error)

            })
        setModalOpen(false)
    }

  if(loading)return(<div>로딩중</div>)
  if(!surveyDetail)return(<div>데이터안받아와짐</div>)
  if(!survey)return(<div>데이터안받아짐2</div>)
  
  return (
    <div>
        {console.log()}
        <BlockDiv>
            <MainItemDiv>
                <ImageUpload>
                    <div style={{ fontSize: '1.3rem', marginTop: '20px', marginBottom: '20px', fontWeight: 'bold' }}>수정</div>
                    <PreviewImg imgFileSrc={imgFileSrc}>
                        {title.length > 0
                            ?
                            <PreviewCard>
                                <PreviewText style={{ marginTop: '10px' }}>{title.length > 0 && `${title}에 관한 설문입니다.`}</PreviewText>
                                <PreviewText>{description}</PreviewText>
                                {/* <PreviewText style={{ marginTop: '10px' }}>설문 문항은 총 {survey.length}문항입니다</PreviewText> */}

                                <PreviewButton onClick={() => {
                                    Swal.fire({
                                        title: 'Submit your Github username',
                                        input: 'text',
                                        inputAttributes: {
                                            autocapitalize: 'off'
                                        },
                                        showCancelButton: true,
                                        confirmButtonText: 'Look up',
                                        showLoaderOnConfirm: true,
                                        preConfirm: (login) => {
                                            return fetch(`//api.github.com/users/${login}`)
                                                .then(response => {
                                                    if (!response.ok) {
                                                        throw new Error(response.statusText)
                                                    }
                                                    return response.json()
                                                })
                                                .catch(error => {
                                                    Swal.showValidationMessage(
                                                        `Request failed: ${error}`
                                                    )
                                                })
                                        },
                                        allowOutsideClick: () => !Swal.isLoading()
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire({
                                                title: `${result.value.login}'s avatar`,
                                                imageUrl: result.value.avatar_url
                                            })
                                        }
                                    })
                                }}>시작하기</PreviewButton>
                            </PreviewCard>
                            : <PreviewCardDefault>미리보기</PreviewCardDefault>
                        }
                    </PreviewImg>

                    <Triangle></Triangle>

                </ImageUpload>
                <TextUpload>
                    <div>
                        <a style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '20px' }}>설문의 제목을 입력해 주세요</a>
                        <TextInput value={title} onChange={(e) => { setTitle(e.target.value) }}></TextInput>
                    </div>
                    <div>
                        <a style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '20px' }}>설문의 상세정보를 입력해 주세요</a>
                        <TextInput value={description} onChange={(e) => { setDescription(e.target.value) }}></TextInput>
                    </div>
                    <div>
                        <a style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '20px' }}>설문 마감일을 설정해주세요.</a>
                        <StyledDatePicker minDate={new Date()} selected={expireDate} placeholderText={"마감기한을 설정해주세요."} locale={ko} dateFormat='yyyy년 MM월 dd일' onChange={changeDate} />
                    </div>
                </TextUpload>
            </MainItemDiv>
        </BlockDiv>

        {survey.map((item, index) => ( // survey의 개수에 따라 ItemDiv를 보여준다.
        
                <BlockDiv key={index}>
                    <ItemDiv>
                        <NumberingDiv>
                            <span>
                                {index < 99 ? ('00' + (index + 1)).slice(-2) : index + 1}
                            </span>
                        </NumberingDiv>
                        <DragSvgWrapper />
                    </ItemDiv>


                    <ItemDiv>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>설문 유형을 선택하세요</div>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel checked={item.type==3} value='3' control={<Radio />} label="객관식(단일)" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index+1 ? { ...item, type: 3, mcitem: [] } : item)) // 객관식 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel checked={item.type==4} value="4" control={<Radio />} label="객관식(복수)" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index+1 ? { ...item, type: 4, mcitem: [] } : item)) // 객관식 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel checked={item.type==2} value="2" control={<Radio />} label="단답형" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index+1 ? { ...item, type: 2 } : item)) // 단답형 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel checked={item.type==1} value="1" control={<Radio />} label="장문형" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index+1 ? { ...item, type: 1 } : item)) // 장문형 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel checked={item.type==5} value="5" control={<Radio />} label="감정바" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index+1 ? { ...item, type: 5 } : item)) // 감정바 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel checked={item.type==6}  value="6" control={<Radio />} label="선형표현" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index+1 ? { ...item, type: 6 } : item)) // 선형표현 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                            </RadioGroup>
                        </FormControl>
                    </ItemDiv>
                    <ItemDiv>
                        {/* 객관식, 주관식, 감정바, 선형표현를 선택함에 따라 다른 정보를 수집 */}
                        {survey[index].type == '3' && // 객관식 단일
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>객관식 선택 요소를 추가하세요</div>
                                <input onKeyPress={handleOnKeyPress} value={multiChoiceItem} data-id={index} style={{ width: '90%' }} placeholder='' onChange={(e) => { setMultiChoiceItem(e.target.value) }}></input>
                                <McitemAddBtn onClick={addMcItem} data-id={index}>추가</McitemAddBtn>
                                <StyledOl>

                                    {survey[index].mcitem.map((mcitem, mcitemIndex) => <StyledLi value={mcitemIndex} data-id={index} onClick={delMcItem}>{mcitem.name}</StyledLi>)}
                                </StyledOl><hr />

                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />

                            </>
                        }
                        {survey[index].type == '4' && // 객관식 복수
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>객관식 선택 요소를 추가하세요</div>
                                <input onKeyPress={handleOnKeyPress} value={multiChoiceItem} data-id={index} style={{ width: '90%' }} placeholder='' onChange={(e) => { setMultiChoiceItem(e.target.value) }}></input>
                                <McitemAddBtn onClick={addMcItem} data-id={index}>추가</McitemAddBtn>
                                <StyledOl>

                                    {survey[index].mcitem.map((mcitem, mcitemIndex) => <StyledLi value={mcitemIndex} data-id={index} onClick={delMcItem}>{mcitem.name}</StyledLi>)}
                                </StyledOl><hr />

                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />

                            </>
                        }
                        {survey[index].type == '2' &&  //단답형
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input placeholder='' data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>설명을 추가하세요</div>
                                <input placeholder='' data-id={index} value={survey[index].description} style={{ width: '100%' }} onChange={onChangeDescription}></input><hr />
                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />
                            </>}
                        {survey[index].type == '1' && //장문형
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>설명을 추가하세요</div>
                                <input placeholder='' data-id={index} value={survey[index].description} style={{ width: '100%' }} onChange={onChangeDescription}></input><hr />
                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />
                            </>}
                        {survey[index].type == '5' && //감정바
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />
                            </>}
                        {survey[index].type == '6' && //선형표현
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />
                            </>}
                    </ItemDiv>
                </BlockDiv>
            ))
            }
            <FuncDiv>
                <Surveybutton style={{ marginRight: '0.5rem', marginBottom: '1rem', backgroundColor: "#ffcd00" }}
                    variant="contained"
                    onClick={() => {
                        setSurvey([...survey, { id: id.current, questionId:-1, q: '', type: '', required: false }]);
                        id.current += 1;
                    }}>
                    질문 추가</Surveybutton>
                {/* 버튼을 누르면 setSurvey 함수를 통해서 질문을 추가해준다 */}
                <Surveybutton style={{ marginRight: '0.5rem' }} onClick={requestSubmit}>설문 수정하기</Surveybutton>
                <hr />
                <button onClick={() => {
                    const jsondata = JSON.stringify(postData)
                    console.log(jsondata)
                }}>JSON타입으로 뽑아내기 <br /> 버튼 클릭 후 콘솔에서 확인하세요.작동안될 시 모달창 열었다가 닫기</button>
            </FuncDiv>
            <Modal isOpen={modalOpen} style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)'

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
                    overflow: "hidden",
                    WebkitOverflowScrolling: 'touch',
                    outline: 'none',
                    borderRadius: '20px',
                    padding: '20px 25px'
                }
            }}>

                <ModalHeader>
                    <ModalDelete onClick={() => { // 모달창을 닫았을때, closeModal을 통해 모달을 닫아주고, PostData 즉, 백엔드로 보낼 데이터도 다시 초기화 해주는 작업 진행
                        closeModal(); setPostData({
                            survey: {
                                name: "",
                                description: "",
                                expirationDate: '',
                            },
                            questions: [

                            ],
                            choiceQuestions: [

                            ]
                        })
                    }}><CloseModalSvg /></ModalDelete>
                </ModalHeader>
                <ModalTitle><h4>설문수정</h4></ModalTitle>
                <ModalDescription>설문을 정말로 수정하시겠습니까?</ModalDescription>
                {console.log(JSON.stringify(postData))}
                <ModalButton onClick={() => { closeModal(); sendToServer() }}>수정하기</ModalButton>

            </Modal>
    </div>
  );
}

export default EditSurvey;


