import React, { useState } from 'react';
import axios from 'axios'; 
import styled from 'styled-components';
import Sidebar from './dashboard/sidebar/Sidebar';
import { useSelector } from 'react-redux' // react-redux사용
import Modal from "react-modal";
import {ReactComponent as CloseModal} from "../img/close.svg"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const MainWrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
  @media (max-width: 450px) {
    padding: 10px;
  }

`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`
const Text1 = styled.span`
  font-size: 24px;
  text-align: left;
  letter-spacing: 0.1px;
  color: #171725;
  @media (max-width: 450px) {
    display: none;
  }
`
const Text2 = styled.span`
  font-size: 18px;
  letter-spacing: 0.1px;
  color: #92929d;
  margin-left: 10px;
  font-family: 'Roboto', sans-serif;
`
const UserSelectDiv = styled.div`
  /* background: #deff58; */
  max-width: 1000px;
  border:0px;
`
const UserAddInput = styled.input`
  width: 500px;
  border: 1px solid #e1e1e1;
`
const UserAddBtn = styled.button`
  border: 0px;
  color:white;
  background-color: gray;
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




function Surveysend() {

  const surveys = useSelector((state) => state.survey.previewsurvey)
  
  const [selectSurvey, setSelectSurvey] = useState(null) // 선택한 설문에 대한 정보를 가진 state
  const [userInput, setUserInput] = useState('') // input에 입력한 정보를 가지고 있는 state
  const [users, setUsers] = useState([]) // 설문을 발송하고자 하는 유저 정보를 가진 배열 state
  const [mailSendModal, setMailSendModal] = useState(false)
  const [postData, setPostData] = useState({})

  console.log(userInput)
  console.log(users)

  const addUser = () =>{
    setUsers((prev)=>( [...prev, {email:userInput}] ))
    setUserInput('')
  }

  const convertPostData = ()=>{
    setPostData({
      surveyId:selectSurvey,
      receivers:users,
    })
  }

  const sendToServer = async ()=>{
    const jwt = localStorage.getItem('jwt')
    await axios.post("/send/email", postData, {
      headers: {
          Authorization: 'Bearer ' + jwt
      }
  })
            .then(res => {
              console.log(res.data)
                }
            )
            .catch((Error) => { console.log(Error) })
  }

  return (
    <>
        <MainWrapper>
          <Sidebar />
          <Wrapper>
            <HeaderContent>
                <div>
                    <Text1>환영합니다,</Text1>
                    <Text2>설문을 발송할 수 있습니다.</Text2>
                </div>
            </HeaderContent>
            <br/>
            <Text1>설문 선택</Text1>
            <br/>
            <FormControl>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">  
                    <TableContainer sx={{ minWidth: 350, maxWidth:1000 }} component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell size='small' align='center' style={{ fontWeight: 'bold' }}>선택</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>설문이름</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>만료일</TableCell>
                                </TableRow>
                            </TableHead>
                                {surveys.map((survey, index)=>(
                                    <TableBody>
                                        <TableCell align='center' ><FormControlLabel onClick={(e)=>{setSelectSurvey(e.target.value)}} value={survey.surveyId} control={<Radio />} /></TableCell>
                                        <TableCell align='center' >{survey.name}</TableCell>
                                        <TableCell align='center' >{survey.expirationDate}</TableCell>
                                    </TableBody>
                                ))}
                            </Table>
                        </TableContainer>
                </RadioGroup>
            </FormControl>
            <br/>
            <Text1>사용자 추가</Text1>
            <br/>
            <UserSelectDiv>
              <UserAddInput value={userInput} onChange={(e)=>{setUserInput(e.target.value)}}/>
              <UserAddBtn onClick={addUser}>추가</UserAddBtn>
            </UserSelectDiv>
            {users.map((user)=>(
              <li>{user.email}</li>
            ))}
            <div style={{display:'flex', justifyContent:'flex-end', paddingTop:'100px'}}>
              <Surveybutton onClick={()=>{setMailSendModal(true); convertPostData();}}>메일 발송하기</Surveybutton>
            </div>
          </Wrapper>
        </MainWrapper>
        <Modal isOpen={mailSendModal} style={{
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
                    <ModalDelete onClick={()=>{setMailSendModal(false)}}><CloseModalSvg/></ModalDelete>
                </ModalHeader>
                <ModalTitle><h4>메일발송</h4></ModalTitle>
                <ModalDescription>정말로 발송하시겠습니까?</ModalDescription>
                <ModalButton onClick={sendToServer}>발송하기</ModalButton>
                <button onClick={()=>{console.log(postData)}}>json형태 보여주기</button>

            </Modal>
    </>
  );
}

export default Surveysend;