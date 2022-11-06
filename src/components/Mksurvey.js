import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";

// mui import
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Input from '@mui/material/Input';

import useDidMountEffect from '../hooks/useDidMountEffect'; // 처음 렌더링을 막아주는 커스텀 훅

import { motion } from "framer-motion" // 애니메이션 효과

import DatePicker from "react-datepicker";//리액트 캘린더 라이브러리
import "react-datepicker/dist/react-datepicker.css"; //캘린더 css
import { ko } from 'date-fns/esm/locale'; // 캘린더 라이브러리 한글화
import axios from 'axios';


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

const ModalDescription = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-left: 10px;
  color: gray;
  font-size: 14px;
`
const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  width:100%;
  background-color: #0dcaf0;
  outline: none;
  cursor: pointer;
  color: white;
  height: 38px;
  border-radius: 20px;
  border: 1px solid #0dcaf0;
  :hover {
    color: #0dcaf0;
    background-color: white;
  }
`

const BlockDiv = styled.div`
    background-color: #fafafa;
    margin: auto;
    margin-top: 3vw;
    padding: 1rem;
    width: 50vw;
    border-radius: 1rem;
    //box-shadow: 10px 5px 5px #bdbdbd;
    overflow:hidden; // overflow, height : div안의 컨텐츠의 크기에 따라 height를 조절
	height:auto;

    transition:all 200ms linear;

    :hover{
        background-color: #f2f2f2;
        //box-shadow: 10px 5px 5px #d6d6d6;
    }
`
const ItemDiv = styled.div`
    overflow:hidden; // overflow, height : div안의 컨텐츠의 크기에 따라 height를 조절
	height:auto;
    padding: 0vw 1vw;
    margin-top: 0.5vw;
`
const FuncDiv = styled.div`
    width: 50vw;
    margin: 3vw auto;
    text-align: right;
`
const NumberingDiv = styled.div`
    background-color: #ffffff;
    width: 25px;
    text-align: center;
    border-radius: 50%;
    font-size: 1rem;
    font-weight: bold;
    box-shadow: 1px 5px 5px #bdbdbd;
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
        background: #ababab;
        border-radius: 100%;
        color: white;
        width: 1.2em;
        text-align: center;
        display: inline-block
    }
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
    width: 300px;
    height: 42px;
    box-sizing: border-box;
    padding: 8px 20px;
    border-radius: 4px;
    font-size: 12px;
`

Modal.setAppElement("#root");
function Mksurvey() { // Make Survey

    const [title, setTitle] = useState('') // 설문 이름에 대한 useState
    const [multiChoiceItem, setMultiChoiceItem] = useState('') // 객관식 항목추가할때 항목 하나하나를 임시로 가지고 있는 State
    const [expireDate, setExpireDate] = useState(new Date()) // 만료 날짜를 설정하는 State
    const [convertedDate, setConvertedDate] = useState('2099-12-30')
    const [survey, setSurvey] = useState([{ id: 0, q: '', type: '', required: false }]) // 현재 만들고 있는 survey에 대한 정보를 담고있음
    const [modalOpen, setModalOpen] = useState(false)

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
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        // have to solve!
        // 업로드된 파일을 formData에다가 저장하는거 까지는 했는데 파일 하나마다 서버로 axios해줘야하는거 같은데 우리는 각각의 문항별로
        // 사진을 업로드를 가능하게 해야하는데 이걸 설문 완료할때 json에 담아서 한번에 보낼 수 있을까?

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


    useEffect(() => {
        window.scrollTo(0, scrollRef.current.scrollHeight)
    }, [survey.length]) //survey에 새로운 질문이 추가되었을때(==survey.length변화) 스크롤을 가장 아래로 내린다.

    useEffect(() => {
        console.log(state)
    }, [state]) // state가 바뀔때마다 확인하려고 만든 임시 useEffect

    const saveData = () => {
        setPostData((
            {
                ...postData,
                survey: {
                    ...postData.survey,
                    name: title,
                    expirationDate: convertedDate,
                },
                choiceQuestions: [
                    ...postData.choiceQuestions,
                    ...survey.filter((item) => (item.type === '3')).map((item, index) => ( //여기 괄호 안이 한질문임!
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
                    ...survey.filter((item) => (item.type !== '3')).map((item, index) => ( // 필터로 객관식 아닌 질문들만 걸러서 questions에 넣어준다.
                        {
                            questionTypeId: item.type,
                            name: item.q,
                            number: String(item.id + 1),
                            answerRequired: item.required
                        }

                    ))
                ]
            }
        ))

    }

    const sendToServer = async () => {

        const formData = new FormData() // FormData 객체 사용

        // formData.append("file", files[0]) //files[0] === upload file 나중에 파일 업로드할때 사용하기! 
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
                        document.location.href = '/dashboard'
                        break;
                    default:
                        break;
                }
            })
            .catch((Error) => {
                console.log(Error)
            })
        setModalOpen(false)
    }


    return (
        <MainWrapper ref={scrollRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            {/* 설문 상단에서 설문 이름 및 기본 정보 작성 부분 */}
            <BlockDiv>
                <ItemDiv>
                    <div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>설문의 이름을 입력해 주세요</div>
                    <Input style={{ width: '100%', marginTop: '10px' }} onChange={(e) => { setTitle(e.target.value) }}></Input>
                    {/* {setTitle.value='' && <span style={{ color: 'red' }}>중복된 글 제목입니다.<br /></span>} */}
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '20px' }}>설문 마감일을 설정해주세요.</div>
                    <StyledDatePicker selected={expireDate} locale={ko} dateFormat='yyyy년 MM월 dd일' onChange={changeDate} />
                    <div style={{ fontSize: '1.3rem', marginTop: '20px', fontWeight: 'bold' }}>설문에 사용할 배경을 업로드해 주세요</div>
                    <input disabled type="file" onChange={onLoadFile}></input>
                </ItemDiv>
            </BlockDiv>

            {/* 설문 항목 부분 */}
            {survey.map((item, index) => ( // survey의 개수에 따라 ItemDiv를 보여준다.
                <BlockDiv key={index}>
                    <ItemDiv>
                        <NumberingDiv>
                            <span>{index + 1}</span>
                        </NumberingDiv>
                    </ItemDiv>


                    <ItemDiv>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>설문 유형을 선택하세요</div>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="3" control={<Radio />} label="객관식" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: '3', mcitem: [] } : item)) // 객관식 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
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
                                <input value={multiChoiceItem} data-id={index} style={{ width: '90%' }} placeholder='' onChange={(e) => { setMultiChoiceItem(e.target.value) }}></input>
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
                                <input data-id={index} value={survey[index].q} style={{ width: '100%', borderRight: '0px' }} onChange={onChange}></input><hr />
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
                <Button
                    style={{ marginRight: '0.5rem' }}
                    variant="contained"
                    onClick={() => {
                        setSurvey([...survey, { id: id.current, q: '', type: '', required: false }])
                        id.current += 1
                    }}>
                    질문 추가
                </Button>{/* 버튼을 누르면 setSurvey 함수를 통해서 질문을 추가해준다 */}
                <Button onClick={() => { openModal(); saveData() }} variant="contained" color="success">설문 등록하기</Button>
                <hr></hr><button onClick={() => {
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
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                outline: 'none',
                borderRadius: '20px',
                padding: '20px 25px'
                }
            }}>

                <ModalHeader>
                <ModalDelete onClick={closeModal}>X</ModalDelete>
                </ModalHeader>
                <ModalTitle>설문등록</ModalTitle>
                <ModalDescription>설문을 정말로 등록하시겠습니까?</ModalDescription>
                <ModalButton onClick={sendToServer}>등록하기</ModalButton>

            </Modal>
        </MainWrapper >
    );
}

export default Mksurvey;