import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDidMountEffect from '../hooks/useDidMountEffect';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';

const PreviewTitle = styled.div`
font-size: 1.5rem;
font-weight: bold;
padding-bottom: 10px;
`
const PreviewContent = styled.div`
margin-bottom: 3px;
`



function Preview(props) {

    const { code } = props

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [surveyDetail, setSurveyDetail] = useState(null)
    const [newSurveyDetail, setNewSurveyDetail] = useState(null)


    useEffect(() => {
        setLoading(true)
        const jwt = localStorage.getItem('jwt')
        axios.get(`${process.env.REACT_APP_DB_HOST}/survey/${code}`, {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        })
            .then((res) => {
                console.log('처음에 데이터 불러오고 그다음에는 실행되면 안되는 useEffect')
                setSurveyDetail((prev) => res.data.result)
                setLoading(false)
            })
            .catch((Error) => {
                setError(Error)
            })
    }, [])



    useDidMountEffect(() => {
        let choice = surveyDetail.choiceQuestions.map((choiceQuestion) => ({ ...choiceQuestion.question, choices: choiceQuestion.choices })) // 객관식 문제만 따로 빼준다
        setNewSurveyDetail((prev) => ({ ...surveyDetail, questions: [...surveyDetail.questions, ...choice] })) // 주관식과 객관식 문제를 합쳐준다.
    }, [surveyDetail]);



    if (loading) {
        return (<div>로딩중</div>)
    }
    if (error) {
        return (<div>{error}</div>)
    }
    if (!surveyDetail) return (
        null
    )
    if (!newSurveyDetail) return (
        null
    )
    return (
        <div>
            {console.log(newSurveyDetail)}
            <PreviewTitle>설문 미리보기</PreviewTitle>
            <PreviewContent>설문 이름 : {newSurveyDetail.survey.name}</PreviewContent>
            <PreviewContent>설문 설명 : {newSurveyDetail.survey.description}</PreviewContent>
            <PreviewContent>설문 생성일 : {newSurveyDetail.survey.createdAt}</PreviewContent>
            <PreviewContent>설문 만료일 : {newSurveyDetail.survey.expirationDate}</PreviewContent>
            <hr />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350, }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>번호</TableCell>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>질문유형</TableCell>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>질문</TableCell>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>비고</TableCell>
                        </TableRow>
                    </TableHead>
                    {newSurveyDetail.questions.sort(function (a, b) { return a.number - b.number }).map((question, index) => ( // 문제 번호에 따라 오름차순으로 정렬 후 map함수 반복 시작
                        <TableBody key={index + 1}>
                            <TableCell align='center' >{question.number}</TableCell>
                            {question.questionTypeId === 1 && <TableCell align='center' >장문형</TableCell>}
                            {question.questionTypeId === 2 && <TableCell align='center' >단답형</TableCell>}
                            {question.questionTypeId === 3 && <TableCell align='center' >객관식(단일)</TableCell>}
                            {question.questionTypeId === 4 && <TableCell align='center' >객관식(복수)</TableCell>}
                            {question.questionTypeId === 5 && <TableCell align='center' >감정바</TableCell>}
                            {question.questionTypeId === 6 && <TableCell align='center' >선형표현</TableCell>}
                            <TableCell align='center' >{question.name}</TableCell>
                            <TableCell align='center' >{'choices' in question && question.choices.map((mcitem) => (<li key={mcitem.number}>{mcitem.name}</li>))}</TableCell>
                        </TableBody>
                    ))}

                </Table>
            </TableContainer>
        </div>
    );
}

export default Preview;