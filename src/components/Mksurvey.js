import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import { ReactComponent as CloseModal } from "../img/close.svg"

// mui import
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';

import { ReactComponent as UploadSvg } from ".././img/upload.svg"
import { ReactComponent as DragSvg } from ".././img/drag.svg"
import useDidMountEffect from '../hooks/useDidMountEffect'; // 처음 렌더링을 막아주는 커스텀 훅

import { motion } from "framer-motion" // 애니메이션 효과

import DatePicker from "react-datepicker";//리액트 캘린더 라이브러리
import "react-datepicker/dist/react-datepicker.css"; //캘린더 css
import { ko } from 'date-fns/esm/locale'; // 캘린더 라이브러리 한글화
import axios from 'axios';


const DragSvgWrapper = styled(DragSvg)`
    margin-right: 5px;
    width:20px;
    height:20px;
    float:right;
    /* &:hover {
      fill: #ff7800;
    } */
`
const UploadSvgWrapper = styled(UploadSvg)`
    width:30px;
    height:30px;
    padding-bottom:5px;
`
const MainWrapper = styled(motion.div)`

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
    /* background-color: #fff9df; */
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

const ImageInput = styled.div`
  label {
    padding-top: 10px ;
    display: inline-flex;
    justify-content: space-evenly;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
    background: #ECEFF1;
	border: 1px solid rgba(0,0,0,0.25);
    font-weight: bold;
    width: 15vh;
    height: 5vh;
    color: black;
    cursor: pointer;
    border-radius: 5px;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
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


Modal.setAppElement("#root");

function Mksurvey() { // Make Survey

    const [title, setTitle] = useState('') // 설문 이름에 대한 useState
    const [description, setDescription] = useState('')
    const [multiChoiceItem, setMultiChoiceItem] = useState('') // 객관식 항목추가할때 항목 하나하나를 임시로 가지고 있는 State
    const [expireDate, setExpireDate] = useState('') // 만료 날짜를 설정하는 State
    const [convertedDate, setConvertedDate] = useState(null) // 백엔드에 보내지는 만료날짜
    const [survey, setSurvey] = useState([{ id: 0, q: '', type: '', required: false }]) // 현재 만들고 있는 survey에 대한 정보를 담고있음
    const [modalOpen, setModalOpen] = useState(false)
    const [imgFile, setImgFile] = useState([null,]) //이미지 파일 정보를 가지고 있는 State
    const [imgFileSrc, setImgFileSrc] = useState('')

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "unset";
    };

    const [postData, setPostData] = useState({
        survey: {
            name: "", // 설문 이름
            description: "", // 설문 추가 설명
            expirationDate: '', //설문 마감 날짜
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


    // console.log(postData) // 백엔드에 보내줄 JSON데이터 형식
    //console.log(survey) // 사용자의 입력을 받은 survey 양식

    const id = useRef(1) // servey 문제마다 id값을 주기 위함
    const scrollRef = useRef() // 질문 추가를 할때마다 스크롤이 가장 아래로 갈 수 있도록 세팅
    const state = useSelector((state) => state.survey)

    const dispatch = useDispatch()


    const onChange = (e) => {
        const targetId = parseInt(e.target.dataset.id) //dataset.id를 통해서 밑에 input태그의 data-id의 값을 가져온다. //https://codechasseur.tistory.com/75
        const q = e.target.value //사용자가 input태그에 입력한 값
        setSurvey(survey.map((item) => item.id === targetId ? { ...item, q: q } : item)) // 사용자가 값을 입력하게되면 onChange함수 실행되고 setSurvey함수를 통해 survey를 map해서 item의 id와 targetid가 같으면 q를 input태그에 입력한 값으로 한다.
    }
    const onChangeDescription = (e) => { //설문 질문에 대한 description
        const targetId = parseInt(e.target.dataset.id) //dataset.id를 통해서 밑에 input태그의 data-id의 값을 가져온다. //https://codechasseur.tistory.com/75
        const description = e.target.value //사용자가 input태그에 입력한 값
        setSurvey(survey.map((item) => item.id === targetId ? { ...item, description: description } : item)) // 사용자가 값을 입력하게되면 onChange함수 실행되고 setSurvey함수를 통해 survey를 map해서 item의 id와 targetid가 같으면 q를 input태그에 입력한 값으로 한다.
    }


    const addMcItem = (e) => {
        const targetId = parseInt(e.target.dataset.id)
        const mcitem = multiChoiceItem
        if (mcitem.length > 0) {
            setSurvey(survey.map((item) => item.id === targetId ? { ...item, mcitem: [...item.mcitem, mcitem] } : item))
            setMultiChoiceItem('')
        }
        else {
            alert('1글자 이상 입력하세요')
        }

    }

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') { // Enter 입력이 되면 클릭 이벤트 실행
            const targetId = parseInt(e.target.dataset.id)
            const mcitem = multiChoiceItem
            if (mcitem.length > 0) {
                setSurvey(survey.map((item) => item.id === targetId ? { ...item, mcitem: [...item.mcitem, mcitem] } : item))
                setMultiChoiceItem('')
            }
            else {
                alert('1글자 이상 입력하세요')
            }
        }
    }


    const onToggle = (e) => {
        const targetId = parseInt(e.target.name)
        setSurvey(survey.map((item) => item.id === targetId ? { ...item, required: !item.required } : item))
    }


    const delMcItem = (e) => {
        const index = parseInt(e.target.dataset.id)
        const mcitemIndex = e.target.value
        const temp = survey[index].mcitem
        temp.splice(mcitemIndex, 1)

        setSurvey(survey.map((item) => item.id === index ? { ...item, mcitem: temp } : item))
    }


    const onLoadFile = (e) => {
        console.log(e.target.files)
        setImgFile(e.target.files)
    }


    const changeDate = (date) => { // 날짜 형식을 백엔드에 보내줘야 할 양식으로 변환하는 함수
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        setExpireDate(date) // 사용자 화면에 보여지기 위한 Date State
        setConvertedDate(date.getFullYear() + '-' + month + '-' + day) // 백엔드에 보내기 위한 Date
    }

    useDidMountEffect(() => {
        dispatch({ type: 'ADDSURVEY', data: postData })
        console.log('useEffect 실행')

    }, [postData]);


    useDidMountEffect(() => {
        window.scrollTo(0, scrollRef.current.scrollHeight)
    }, [survey.length]) //survey에 새로운 질문이 추가되었을때(==survey.length변화) 스크롤을 가장 아래로 내린다.

    useEffect(() => {
        console.log(state)
    }, [state]) // state가 바뀔때마다 확인하려고 만든 임시 useEffect

    useEffect(() => {
        console.log(postData, 'pd')
    }, [postData])

    useDidMountEffect(() => {
        encodeFileToBase64(imgFile[0])
    }, [imgFile])

    const saveData = () => {
        setPostData((
            {
                ...postData,
                survey: {
                    ...postData.survey,
                    name: title,
                    description: description,
                    expirationDate: convertedDate,
                },
                choiceQuestions: [
                    ...postData.choiceQuestions,
                    ...survey.filter((item) => (item.type === '3' || item.type === '4')).map((item, index) => ( //여기 괄호 안이 한질문임!
                        {
                            choices:
                                item.mcitem.map((mcitem, index) => (
                                    {
                                        name: mcitem,
                                        number: index + 1
                                    }
                                ))
                            ,
                            question: {
                                questionTypeId: item.type,
                                name: item.q,
                                number: String(item.id + 1),
                                answerRequired: item.required
                            }
                        }
                    ))
                ],
                questions: [
                    ...postData.questions,
                    ...survey.filter((item) => (item.type !== '3' && item.type !== '4')).map((item, index) => ( // 필터로 객관식 아닌 질문들만 걸러서 questions에 넣어준다.
                        {
                            questionTypeId: item.type,
                            name: item.q,
                            description: item.description,
                            number: String(item.id + 1),
                            answerRequired: item.required
                        }

                    ))
                ]
            }
        ))

    }

    const requestSubmit = () => {
        if (title.length < 1) { // 설문 제목의 길이가 0일때
            alert('설문 이름을 입력하세요')
        }
        else if (convertedDate == null) { // 저장된 만료날짜가 없을때
            alert('마감날짜를 설정하세요')
        }
        else if (survey[0].q.length < 1) { // 첫번째 질문의 길이가 0일때(객관식 제외하고 나머지)
            alert('최소 1개의 질문은 생성하세요')

        }
        else if (survey[0].type === '3' && survey[0].mcitem.length === 0) { //객관식일때
            alert('최소 1개의 선택지를 생성하세요');
        }
        else {
            openModal()
            saveData()
        }
    }

    const sendToServer = async () => {

        const formData = new FormData() // FormData 객체 사용

        formData.append("thumbnailImg", imgFile[0]) //imgFile[0] === upload file (썸네일 이미지)

        const jwt = localStorage.getItem('jwt')
        const blob = new Blob([JSON.stringify(postData)], { type: "application/json" })// type을 지정해주고 저장
        formData.append("surveyReqDto", blob)//formData는 특수 개체라 특정한 조작으로만 조작 가능!
        await axios({
            method: "POST",
            url: `/survey/create`,
            headers: {
                Authorization: 'Bearer ' + jwt,
            },
            data: formData,
        })
            .then((res) => {
                console.log(res.data.code)
                switch (res.data.code) {
                    case 1000:
                        document.location.href = '/home/dashboard'
                        break;
                    case 4001: //질문유형이 없을경우
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

    const encodeFileToBase64 = (file) => { // 파일을 읽어서 
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImgFileSrc(reader.result);
                resolve();
            };
        });
    };

    return (

        <MainWrapper ref={scrollRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >

            {console.log(survey)}
            {console.log(multiChoiceItem)}
            {/* 설문 상단에서 설문 이름 및 기본 정보 작성 부분 */}
            <BlockDiv>
                <MainItemDiv>
                    <ImageUpload>
                        <div style={{ fontSize: '1.3rem', marginTop: '20px', marginBottom: '20px', fontWeight: 'bold' }}>설문에 사용할 배경을 업로드해 주세요</div>

                        <PreviewImg imgFileSrc={imgFileSrc}>
                            {title.length > 0
                                ?
                                <PreviewCard>
                                    <PreviewText style={{ marginTop: '10px' }}>{title.length > 0 && `${title}에 관한 설문입니다.`}</PreviewText>
                                    <PreviewText>{description}</PreviewText>
                                    <PreviewText style={{ marginTop: '10px' }}>{`설문 문항은 총 5문항입니다`}</PreviewText>

                                    <PreviewButton onClick={() => { alert('뭘봐') }}>시작하기</PreviewButton>
                                </PreviewCard>
                                : <PreviewCardDefault>미리보기</PreviewCardDefault>
                            }
                        </PreviewImg>

                        <Triangle></Triangle>

                        <ImageInput>
                            <label htmlFor="ex_file">
                                <UploadSvgWrapper />
                                <a style={{ paddingTop: '5px' }}>파일 선택</a>
                            </label>
                            <input type="file" id="ex_file" onChange={onLoadFile}></input>
                        </ImageInput>
                    </ImageUpload>
                    <TextUpload>
                        <div>
                            <a style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '20px' }}>설문의 제목을 입력해 주세요</a>
                            <TextInput onChange={(e) => { setTitle(e.target.value) }}></TextInput>
                        </div>
                        <div>
                            <a style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '20px' }}>설문의 상세정보를 입력해 주세요</a>
                            <TextInput onChange={(e) => { setDescription(e.target.value) }}></TextInput>
                        </div>
                        <div>
                            <a style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '20px' }}>설문 마감일을 설정해주세요.</a>
                            <StyledDatePicker minDate={new Date()} selected={expireDate} placeholderText={"마감기한을 설정해주세요."} locale={ko} dateFormat='yyyy년 MM월 dd일' onChange={changeDate} />
                        </div>
                    </TextUpload>
                </MainItemDiv>
            </BlockDiv>

            {/* 설문 항목 부분 */}
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
                                <FormControlLabel value="3" control={<Radio />} label="객관식(단일)" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: '3', mcitem: [] } : item)) // 객관식 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel value="4" control={<Radio />} label="객관식(복수)" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: '4', mcitem: [] } : item)) // 객관식 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel value="2" control={<Radio />} label="단답형" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: '2' } : item)) // 단답형 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel value="1" control={<Radio />} label="장문형" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: '1' } : item)) // 장문형 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel value="5" control={<Radio />} label="감정바" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: '5' } : item)) // 감정바 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel value="6" control={<Radio />} label="선형표현" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: '6' } : item)) // 선형표현 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                            </RadioGroup>
                        </FormControl>
                    </ItemDiv>
                    <ItemDiv>
                        {/* 객관식, 주관식, 감정바, 선형표현를 선택함에 따라 다른 정보를 수집 */}
                        {survey[index].type === '3' &&
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>객관식 선택 요소를 추가하세요</div>
                                <input onKeyPress={handleOnKeyPress} value={multiChoiceItem} data-id={index} style={{ width: '90%' }} placeholder='' onChange={(e) => { setMultiChoiceItem(e.target.value) }}></input>
                                <McitemAddBtn onClick={addMcItem} data-id={index}>추가</McitemAddBtn>
                                <StyledOl>

                                    {survey[index].mcitem.map((mcitem, mcitemIndex) => <StyledLi value={mcitemIndex} data-id={index} onClick={delMcItem}>{mcitem}</StyledLi>)}
                                </StyledOl><hr />

                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />

                            </>
                        }
                        {survey[index].type === '4' &&
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>객관식 선택 요소를 추가하세요</div>
                                <input onKeyPress={handleOnKeyPress} value={multiChoiceItem} data-id={index} style={{ width: '90%' }} placeholder='' onChange={(e) => { setMultiChoiceItem(e.target.value) }}></input>
                                <McitemAddBtn onClick={addMcItem} data-id={index}>추가</McitemAddBtn>
                                <StyledOl>

                                    {survey[index].mcitem.map((mcitem, mcitemIndex) => <StyledLi value={mcitemIndex} data-id={index} onClick={delMcItem}>{mcitem}</StyledLi>)}
                                </StyledOl><hr />

                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />

                            </>
                        }
                        {survey[index].type === '2' &&
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input placeholder='' data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>설명을 추가하세요</div>
                                <input placeholder='' data-id={index} value={survey[index].discription} style={{ width: '100%' }} onChange={onChangeDescription}></input><hr />
                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />
                            </>}
                        {survey[index].type === '1' &&
                            <>
                                <hr /><div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>질문을 입력하세요</div>
                                <input data-id={index} value={survey[index].q} style={{ width: '100%' }} onChange={onChange}></input><hr />
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>설명을 추가하세요</div>
                                <input placeholder='' data-id={index} value={survey[index].discription} style={{ width: '100%' }} onChange={onChangeDescription}></input><hr />
                                <FormControlLabel
                                    control={
                                        <Switch onClick={onToggle} checked={survey[index].required} name={index} />
                                    }
                                    label="필수답변"
                                />
                            </>}
                        {survey[index].type === '5' &&
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
                        {survey[index].type === '6' &&
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

            {/* 설문 등록 및 설문 기능 핸들링 부분 */}
            <FuncDiv>
                <Surveybutton style={{ marginRight: '0.5rem', marginBottom: '1rem', backgroundColor: "#ffcd00" }}
                    variant="contained"
                    onClick={() => {
                        setSurvey([...survey, { id: id.current, q: '', type: '', required: false }])
                        id.current += 1
                    }}>
                    질문 추가</Surveybutton>
                {/* 버튼을 누르면 setSurvey 함수를 통해서 질문을 추가해준다 */}
                <Surveybutton style={{ marginRight: '0.5rem' }} onClick={requestSubmit}>설문 등록하기</Surveybutton>
                <hr />
                {/* <button onClick={() => {
                    const jsondata = JSON.stringify(postData)
                    console.log(jsondata)
                }}>JSON타입으로 뽑아내기 <br /> 버튼 클릭 후 콘솔에서 확인하세요.작동안될 시 모달창 열었다가 닫기</button> */}
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
                <ModalTitle><h4>설문등록</h4></ModalTitle>
                <ModalDescription>설문을 정말로 등록하시겠습니까?</ModalDescription>
                <ModalButton onClick={() => { closeModal(); sendToServer() }}>등록하기</ModalButton>

            </Modal>
        </MainWrapper >
    );
}

export default Mksurvey;