import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const TitleDiv = styled.div`
    background-color: #e5e5e5;
    margin: auto;
    margin-top: 3vw;
    padding: 1rem;
    width: 50vw;
    height: 10vw;
    border-radius: 1rem;
    box-shadow: 10px 5px 5px #bdbdbd;
`
const ItemDiv = styled.div`
    background-color: #e5e5e5;
    margin: auto;
    margin-top: 3vw;
    padding: 1rem;
    width: 50vw;
    height: 25vw;
    border-radius: 1rem;
    box-shadow: 10px 5px 5px #bdbdbd;
`
const FuncDiv = styled.div`
    width: 50vw;
    margin: 3vw auto;
    text-align: right;

`

function Mksurvey() { // Make Survey

    const [title, setTitle] = useState('') // 설문 이름에 대한 useState
    const [survey, setSurvey] = useState([{ id: 0, q: '', type: '' }]) // 현재 만들고 있는 survey에 대한 정보를 담고있음

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
            <TitleDiv>
                설문의 이름을 입력해 주세요
                <input style={{ width: '100%' }} onChange={(e) => { setTitle(e.target.value) }}></input>
            </TitleDiv>

            {survey.map((item, index) => ( // survey의 개수에 따라 ItemDiv를 보여준다.
                <ItemDiv key={index}>
                    {index + 1}. 질문을 입력하세요<input data-id={index} style={{ width: '100%' }} onChange={onChange}></input>
                </ItemDiv>
            ))}
            <FuncDiv>
                <Button style={{ marginRight: '0.5rem' }} variant="contained" onClick={() => { setSurvey([...survey, { id: id.current, q: '', type: '' }]); id.current += 1 }}>질문 추가</Button>
                {/* 버튼을 누르면 setSurvey 함수를 통해서 질문을 추가해준다 */}
                <Button onClick={onSummit} variant="contained" color="success">설문 생성하기</Button>
            </FuncDiv>
        </>
    );
}

export default Mksurvey;