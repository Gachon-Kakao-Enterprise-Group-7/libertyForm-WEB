import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './dashboard/sidebar/Sidebar';
import { useSelector } from 'react-redux' // react-redux사용
import Modal from "react-modal";
import { ReactComponent as UserAddSvg } from "../img/adduser.svg"
import { ReactComponent as CloseModal } from "../img/close.svg"
import { ReactComponent as Check } from "../img/checkmark.svg"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



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
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`
const Text1 = styled.span`
  font-size: 1.8rem;
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
const CloseModalSvg = styled(CloseModal)`
    fill: #92929d;
    width:30px;
    height:30px;
    &:hover {
      fill: #ff7800;
    }
`
const AddUserBtn = styled.button`
border: 0px;
background: #ffcd00;
height: 40px;
color:#fff6da;
font-weight: bold;
padding: 5px;
border-radius: 5px;
margin-left: 10px;
margin-bottom: 5px;
`
const Label = styled.div`
  width: 50px;
  display: inline-block;
  margin: 10px;
`

function Sendermanagement() {

  const [contacts, setContacts] = useState(false)
  const [addUserModal, setAddUserModal] = useState(false)
  const [inputs, setInputs] = useState({
      email: '',
      name: '',
      relationship: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  const changeInputs = (e) =>{
    const name = e.target.name
    const value = e.target.value

    setInputs((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const sendToServer = async () =>{ // 즐겨찾는 주소 정보 서버에 등록하기
    const jwt = localStorage.getItem('jwt')
    await axios.post("/contact/create", inputs, {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    })
      .then(res => {
        switch(res.data.code){
          case 1000:
            console.log('등록완료!')
            alert('등록되었습니다')
            window.location.href = '/sendermanagement'
            setAddUserModal(false)
            break;
          case 2010:
            console.log('존재하지 않는 유저입니다.')
            break;
          case 2017:
            alert('본인은 등록 할 수 없습니다.')
            break;
          case 2018:
            alert('이미 등록되어 있습니다.')
            break;
          default:
            break;
        }
        console.log(res.data.code)
        
      }
      )
      .catch((Error) => { console.log(Error) })
  }

  useEffect(()=>{ // 서버에 등록되어 있는 연락처 정보 받아오기
    setLoading(true)
    const jwt = localStorage.getItem('jwt')
    axios.get("/contact", {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    })
      .then(res => {
        console.log(res.data)
        setContacts((prev)=>res.data.result)
        setLoading(false)
      }
      )
      .catch((Error) => { console.log(Error) })
  },[])

  if(loading){
    return null
  }
  if(error){
    return <div>{error}</div>
  }
  if(!contacts){
    return null
  }

  return (
    <>
      <MainWrapper>
        <Sidebar />
        <Wrapper>
          <HeaderContent>
            <div>
              <Text1>환영합니다,</Text1>
              <Text2>즐겨찾는 이메일 주소를 추가하고 편리하게 발송하세요</Text2>
            </div>
          </HeaderContent>
          <br />
          <SectionWrapper>
            <div style={{display:'inline'}}>
                <Text1>주소록</Text1>
                <AddUserBtn onClick={()=>{setAddUserModal(true)}}><UserAddSvg width='30px' fill='#ff7800'/>유저 추가</AddUserBtn>
            </div>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350, }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{color:'red'}}>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>이름</TableCell>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>이메일</TableCell>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>관계</TableCell>
                            <TableCell align='center' size='small' style={{ fontWeight: 'bold' }}>회원여부</TableCell>
                        </TableRow>
                    </TableHead>
                    {contacts.map((contact, index)=>(
                      <TableBody key={index}>
                        <TableCell align='center' >{contact.name}</TableCell>
                        <TableCell align='center' >{contact.email}</TableCell>
                        <TableCell align='center' >{contact.relationship}</TableCell>
                        <TableCell align='center' >{contact.member&&<Check width='30px'/>}</TableCell>
                      </TableBody>
                    ))}
                </Table>
            </TableContainer>
          </SectionWrapper>
        </Wrapper>
      </MainWrapper>
      <Modal isOpen={addUserModal} style={{
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
          width: '550px',
          height: '550px',
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
          <ModalDelete onClick={() => {setAddUserModal(false)}}><CloseModalSvg /></ModalDelete>
        </ModalHeader>
        <ModalTitle><h4>유저 추가</h4></ModalTitle>
        <ModalDescription>
          <div>
            <Label>이름</Label>
            <input name='name' onChange={changeInputs}/>
          </div>
          <div>
            <Label>이메일</Label>
            <input name='email' onChange={changeInputs}/>
          </div>
          <div>
            <Label>관계</Label>
            <input name='relationship' onChange={changeInputs}/>
          </div>
        </ModalDescription>
        <ModalButton onClick={sendToServer}>발송하기</ModalButton>

      </Modal>
    </>
  );
}

export default Sendermanagement;