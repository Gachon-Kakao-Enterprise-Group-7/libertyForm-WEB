import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// mui import
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Input from '@mui/material/Input';

import { Link } from "react-router-dom"; // Link를 이용해 원하는 페이지로 이동할 수 있게 한다

import useDidMountEffect from '../hooks/useDidMountEffect'; // 처음 렌더링을 막아주는 커스텀 훅

import { motion } from "framer-motion"

const BlockDiv = styled(motion.div)`
    background-color: #e5e6f794;
    margin: auto;
    margin-top: 3vw;
    padding: 1rem;
    width: 50vw;
    border-radius: 1rem;
    box-shadow: 10px 5px 5px #bdbdbd;
    overflow:hidden; // overflow, height : div안의 컨텐츠의 크기에 따라 height를 조절
	height:auto;

    transition:all 200ms linear;

    :hover{
        box-shadow: 10px 5px 5px #656565;
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



function Mksurvey() { // Make Survey

    const [title, setTitle] = useState('') // 설문 이름에 대한 useState
    const [multiChoiceItem, setMultiChoiceItem] = useState('') // 객관식 항목추가할때 항목 하나하나를 임시로 가지고 있는 useState
    const [survey, setSurvey] = useState([{ id: 0, q: '', type: '', required: false }]) // 현재 만들고 있는 survey에 대한 정보를 담고있음

    const [postData, setPostData] = useState({
        survey: {
            name: "", // 설문 이름
            description: "", // 설문 추가 설명
            expirationDate: '', //설문 마감 날짜
        },
        questions: [
            // { //이 부분은 계속 누적하는 부분이라 기본값이 있으면 안된다.
            //     surveyId: '',//설문 고유 ID -> 이거 백에서 필요없다고 한거같은데...
            //     questionType: '', // 질문 타입
            //     name: '', // 질문 이름
            //     description: '',//추가 설명
            //     number: '',//질문 번호
            //     backgroundImgUrl: '',
            //     questionImgUrl: '',
            //     answerRequired: '',
            // 
        ]

    })






    // console.log(postData) // 백엔드에 보내줄 JSON데이터 형식
    // console.log(survey) // 사용자의 입력을 받은 survey 양식

    const id = useRef(1) // servey 문제마다 id값을 주기 위함
    const scrollRef = useRef() // 질문 추가를 할때마다 스크롤이 가장 아래로 갈 수 있도록 세팅
    const state = useSelector((state) => state.survey)
    console.log(state)
    const dispatch = useDispatch()





    const onChange = (e) => {
        console.log('onChange작동')
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
        console.log('ontoggle작동')
        const targetId = parseInt(e.target.name)
        console.log(targetId)
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

    const onSummit = () => {
        setPostData((
            {
                ...postData,
                survey: {
                    ...postData.survey,
                    name: title
                },
                questions: [
                    ...postData.questions,
                    ...survey.map((item, index) => (
                        {
                            questionType: survey[index].type,
                            name: survey[index].q,
                            number: String(survey[index].id + 1),
                            answerRequired: survey[index].required
                        }
                    ))
                ]
            }
        ))

    }

    useDidMountEffect(() => {
        dispatch({ type: 'ADDSURVEY', data: postData })
    }, [postData]);


    useEffect(() => {
        window.scrollTo(0, scrollRef.current.scrollHeight)
    }, [survey.length]) //survey에 새로운 질문이 추가되었을때(==survey.length변화) 스크롤을 가장 아래로 내린다.


    return (
        <div ref={scrollRef}>
            {/* 설문 상단에서 설문 이름 및 기본 정보 작성 부분 */}
            <BlockDiv>
                <ItemDiv>
                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>설문의 이름을 입력해 주세요</div>
                    <Input style={{ width: '100%', marginTop: '10px' }} onChange={(e) => { setTitle(e.target.value) }}></Input>
                    <div style={{ fontSize: '1.3rem', marginTop: '20px', fontWeight: 'bold' }}>설문에 사용할 배경을 업로드해 주세요</div>
                    <input disabled type="file" onChange={onLoadFile}></input>
                </ItemDiv>
            </BlockDiv>

            {/* 설문 항목 부분 */}
            {survey.map((item, index) => ( // survey의 개수에 따라 ItemDiv를 보여준다.
                <BlockDiv key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                                <FormControlLabel value="other" control={<Radio />} label="추가기능" disabled />
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
                                {/* // 선택항목으로 추가한 요소들이 여기에 보여진다 */}
                                {console.log(multiChoiceItem)}
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
                <Button onClick={onSummit} variant="contained" color="success">설문 생성하기</Button>
            </FuncDiv>
        </div >
    );
}

export default Mksurvey;