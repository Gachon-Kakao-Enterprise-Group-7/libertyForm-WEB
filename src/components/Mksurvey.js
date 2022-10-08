import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// mui import
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const BlockDiv = styled.div`
    background-color: #e5e5e5;
    margin: auto;
    margin-top: 3vw;
    padding: 1rem;
    width: 50vw;
    border-radius: 1rem;
    box-shadow: 10px 5px 5px #bdbdbd;
    overflow:hidden; // overflow, height : div안의 컨텐츠의 크기에 따라 height를 조절
	height:auto;
`
const ItemDiv = styled.div`
    overflow:hidden; // overflow, height : div안의 컨텐츠의 크기에 따라 height를 조절
	height:auto;
    padding: 1vw;
`
const FuncDiv = styled.div`
    width: 50vw;
    margin: 3vw auto;
    text-align: right;

`
const NumberingDiv = styled.div`
    background-color: #ffffff;
    width: 2vw;
    text-align: center;
    border-radius: 50%;
    font-size: 1.5vw;
    font-weight: bold;
    box-shadow: 1px 5px 5px #bdbdbd;
`




function Mksurvey() { // Make Survey


    const [title, setTitle] = useState('') // 설문 이름에 대한 useState
    const [survey, setSurvey] = useState([{ id: 0, q: '', type: '' }]) // 현재 만들고 있는 survey에 대한 정보를 담고있음
    console.log(survey)
    const id = useRef(1) // servey 문제마다 id값을 주기 위함
    const state = useSelector((state) => state.survey)
    const dispatch = useDispatch()

    const onChange = (e) => {
        const targetId = parseInt(e.target.dataset.id) //dataset.id를 통해서 밑에 input태그의 data-id의 값을 가져온다. //https://codechasseur.tistory.com/75
        const q = e.target.value //사용자가 input태그에 입력한 값
        setSurvey(survey.map((item) => item.id === targetId ? { ...item, q: q } : item)) // 사용자가 값을 입력하게되면 onChange함수 실행되고 setSurvey함수를 통해 survey를 map해서 item의 id와 targetid가 같으면 q를 input태그에 입력한 값으로 한다.
    }

    const onSummit = () => {
        dispatch({ type: 'SURVEYSUMMIT', survey: survey, title: title })
    }


    return (
        <>
            {/* 설문 상단에서 설문 이름 및 기본 정보 작성 부분 */}
            <BlockDiv>
                <ItemDiv>
                    설문의 이름을 입력해 주세요
                    <input style={{ width: '100%' }} onChange={(e) => { setTitle(e.target.value) }}></input>
                </ItemDiv>
            </BlockDiv>

            {/* 설문 항목 부분 */}
            {survey.map((item, index) => ( // survey의 개수에 따라 ItemDiv를 보여준다.
                <BlockDiv key={index}>
                    <NumberingDiv>
                        {index + 1}
                    </NumberingDiv>
                    <ItemDiv>
                        설문의 유형을 선택해 주세요<br />
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="multi_choice" control={<Radio />} label=" 객관식" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: 'multi_choice' } : item)) // 객관식 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel value="subjective" control={<Radio />} label="주관식" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: 'subjective' } : item)) // 객관식 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel value="scroll" control={<Radio />} label=" 감정바" onClick={(e) => {
                                    setSurvey(survey.map((item) => item.id === index ? { ...item, type: 'scroll' } : item)) // 객관식 버튼을 눌렀을때 setsurvey를 통해 survey의 type을 변경한다
                                }} />
                                <FormControlLabel value="other" control={<Radio />} label="선형표현" disabled />
                                <FormControlLabel value="other" control={<Radio />} label="추가기능" disabled />
                            </RadioGroup>
                        </FormControl>
                    </ItemDiv>
                    <ItemDiv>
                        질문을 입력하세요<input data-id={index} style={{ width: '100%' }} onChange={onChange}></input>
                    </ItemDiv>
                </BlockDiv>
            ))}

            {/* 설문 등록 및 설문 기능 핸들링 부분 */}
            <FuncDiv>
                <Button style={{ marginRight: '0.5rem' }} variant="contained" onClick={() => { setSurvey([...survey, { id: id.current, q: '', type: '' }]); id.current += 1 }}>질문 추가</Button>
                {/* 버튼을 누르면 setSurvey 함수를 통해서 질문을 추가해준다 */}
                <Button onClick={onSummit} variant="contained" color="success">설문 생성하기</Button>
            </FuncDiv>
        </>
    );
}

export default Mksurvey;