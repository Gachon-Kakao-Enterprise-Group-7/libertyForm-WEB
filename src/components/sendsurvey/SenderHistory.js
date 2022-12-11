import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDidMountEffect from '../../hooks/useDidMountEffect';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { ReactComponent as Check } from "svg/checkmark.svg"


const WidthBox = styled.div`
  width: 30px;
  height: 30px;
`

const StyledTableCell = styled(TableCell) ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ffcd00",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  });

  const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  color: #171725;
  font-size: 2rem;
  margin: 20px 10px 20px 0;
  border-bottom: 1px solid #e2e2ea;
  height: 50px;

  & h4 {
    padding-bottom: 10px;
    font-weight: bold;
  }
`
const PreviewContent = styled.div`
margin-bottom: 3px;
`


function SenderHistory(props) {

    const surveyId = props.surveyId

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [confirmResult, setConfirmResult] = useState(false)

    useEffect(() => {
        setLoading(true)
        const jwt = localStorage.getItem('jwt')
        axios.get(`${process.env.REACT_APP_DB_HOST}/manage/load?surveyId=${surveyId}`, {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        })
            .then((res) => {
                setConfirmResult(res.data.result.surveyManagements)
                setLoading(false)
                console.log(res.data.result)
            })
            .catch((Error) => {
                setError(Error)
            })
    }, [])


    useEffect(()=>{
        console.log(confirmResult)
    },[confirmResult])

    if (loading) {
        return (<div>로딩중</div>)
    }
    if (error) {
        return (<div>{error}</div>)
    }
    if(!confirmResult){
        return(<div>데이터가 정상적으로 불러오지 못함</div>)
    }
    if(confirmResult.length === 0){
        return(<div>설문이 발송되지 않았습니다!</div>)
    }
    return (
        <>
        <PreviewTitle><h4>설문 이력관리</h4></PreviewTitle>
        {/* <PreviewContent>설문 이름 : {newSurveyDetail.survey.name}</PreviewContent>
        <PreviewContent>설문 설명 : {newSurveyDetail.survey.description}</PreviewContent>
        <PreviewContent>설문 기간 : {newSurveyDetail.survey.createdAt} ~ {newSurveyDetail.survey.expirationDate}</PreviewContent> */}
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350, }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center' style={{ fontWeight: 'bold' }}>목록</StyledTableCell>
                            <StyledTableCell align='center' style={{ fontWeight: 'bold' }}>이름</StyledTableCell>
                            <StyledTableCell align='center' style={{ fontWeight: 'bold' }}>이메일</StyledTableCell>
                            <StyledTableCell align='center' style={{ fontWeight: 'bold' }}>상태</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {confirmResult.map((person, index)=>(
                        <TableBody >
                            <TableCell align='center' >{index+1}</TableCell>
                            <TableCell align='center' >{person.contactName}</TableCell>
                            <TableCell align='center' >{person.email}</TableCell>
                            <TableCell align='center' >
                                {person.responseStatus === 'PENDING' && '읽지않음'}
                                {person.responseStatus === 'CONFIRM' && '읽음'}
                                {person.responseStatus === 'SUBMIT' && '제출완료'}
                            </TableCell>
                        </TableBody>
                    ))}

                </Table>
            </TableContainer>
            </>
    );
}

export default SenderHistory;