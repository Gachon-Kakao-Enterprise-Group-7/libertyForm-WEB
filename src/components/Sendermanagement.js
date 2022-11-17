import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux' // react-redux사용
import Modal from "react-modal";
import { ReactComponent as UserAddSvg } from "../img/adduser.svg"
import { ReactComponent as CloseModal } from "../img/close.svg"
import { ReactComponent as Check } from "../img/checkmark.svg"
import { ReactComponent as Delete } from "../img/delete.svg"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
  margin-left: 10px;
  width: 98%;
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

const WidthBox = styled.div`
  width: 30px;
  height: 30px;
`

const Search = styled.input`
    all: unset;
    background-color: white;
    width: 90%;
    height: 50px;
    font-size: 25px;
    margin-bottom: 40px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
        rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    ::placeholder {
        font-size: 16px;
    }
`;

function Sendermanagement() {

  const dispatch = useDispatch();

  const [contacts, setContacts] = useState(false)
  const [addUserModal, setAddUserModal] = useState(false)
  const [DeleteModal, setDeleteModal] = useState(false)
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    relationship: '',
  })

  const [users, setUsers] = useState([]);
  const [copy, setCopy] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [wantToDel, setWantToDel] = useState('')

  const handleInputChange = (e) => {
    setSearch(e.target.value); 
    };

  const changeInputs = (e) => {
    const name = e.target.name
    const value = e.target.value

    setInputs((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const jwt = localStorage.getItem('jwt')
  const deleteUser = () => {
    console.log(wantToDel)
    axios.get(`/contact/delete?email=${wantToDel}`, {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    })
      .then((res) => {
        console.log(res.data.code)
      })
      .catch((Error) => { console.log(Error) })
  }


  const sendToServer = async () => { // 즐겨찾는 주소 정보 서버에 등록하기
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'); //이메일 정규식
    if (regex.test(inputs.email)) {
      await axios.post("/contact/create", inputs, {
        headers: {
          Authorization: 'Bearer ' + jwt
        }
      })
        .then(res => {
          switch (res.data.code) {
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
    else {
      alert('이메일 형식이 잘못되었습니다.')
    }

  }

  useEffect(() => { // 서버에 등록되어 있는 연락처 정보 받아오기
    setLoading(true)
    axios.get("/contact", {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    })
      .then(res => {
        console.log(res.data)
        setContacts((prev) => res.data.result)
        setUsers((prev) => res.data.result);
        setCopy((prev) => res.data.result);
        dispatch({ type: 'TEST' })
        setLoading(false)
      }
      )
      .catch((Error) => { setError(Error) })
  }, [])

  useEffect(() => {
    setUsers(
        copy.filter(
            (e) =>
                e.name.toLowerCase().includes(search.toLowerCase()) ||
                e.email.toLowerCase().includes(search.toLowerCase()) ||
                e.relationship.toLowerCase().includes(search.toLowerCase())
        )
    );
    console.log(users);
}, [search, copy]);




  if (loading) {
    return null
  }
  if (error) {
    return <div>{error}</div>
  }
  if (!contacts) {
    return null
  }

  return (
    <>
          <HeaderContent>
            <div>
              <Text1>환영합니다,</Text1>
              <Text2>즐겨찾는 이메일 주소를 추가하고 편리하게 발송하세요</Text2>
            </div>
          </HeaderContent>
          <br />
          <SectionWrapper>
            <div style={{ display: 'inline' }}>
              <Text1>주소록</Text1>
              <AddUserBtn onClick={() => { setAddUserModal(true) }}><UserAddSvg width='30px' fill='#ff7800' />유저 추가</AddUserBtn>
              <Search
                    placeholder="이름, 팀, 이메일 검색"
                    onChange={handleInputChange}
                />
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350, }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ color: 'red' }}>
                    <TableCell align='center' style={{ fontWeight: 'bold' }}>이름</TableCell>
                    <TableCell align='center' style={{ fontWeight: 'bold' }}>이메일</TableCell>
                    <TableCell align='center' style={{ fontWeight: 'bold' }}>관계</TableCell>
                    <TableCell align='center' size='small' style={{ fontWeight: 'bold' }}>회원여부</TableCell>
                    <TableCell align='center' size='small' style={{ fontWeight: 'bold' }}>삭제</TableCell>
                  </TableRow>
                </TableHead>
                {users.map((user, index) => (
                  <TableBody key={index}>
                    <TableCell align='center' padding='none'>{user.name}</TableCell>
                    <TableCell align='center' padding='none'>{user.email}</TableCell>
                    <TableCell align='center' padding='none'>{user.relationship}</TableCell>
                    <TableCell align='center' padding='none'>{user.member ? <Check width='20px' height='30px' fill='black' /> : <WidthBox></WidthBox>}</TableCell>
                    <TableCell align='center' padding='none' ><Delete width='20px' cursor='pointer' onClick={() => { setDeleteModal(true);setWantToDel(user.email) }} /></TableCell>
                    {/* 주소록에 글자 패딩 사이즈 조절하고 싶으면 바로 위에 Check에 height 변경하고, WidthBox의 크기 똑같이 조절해주면 됨 */}
                  </TableBody>

                )) }
              </Table>
            </TableContainer>
          </SectionWrapper>
      <Modal isOpen={DeleteModal} style={{ // 설문 삭제에 관한 모달
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
          overflow: 'hidden',
          outline: 'none',
          borderRadius: '20px',
          padding: '20px 25px'
        }
      }}>

        <ModalHeader>
          <ModalDelete onClick={() => { setDeleteModal(false) }}><CloseModalSvg /></ModalDelete>
        </ModalHeader>
        <ModalTitle><h4>유저 삭제</h4></ModalTitle>
        <ModalDescription>정말 삭제하시겠습니까?</ModalDescription>
        <ModalButton onClick={deleteUser}>삭제하기</ModalButton>
      </Modal>

      <Modal isOpen={addUserModal} style={{
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
          height: '50vh',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'hidden',
          outline: 'none',
          borderRadius: '20px',
          padding: '20px 25px'
        }
      }}>

        <ModalHeader>
          <ModalDelete onClick={() => { setAddUserModal(false) }}><CloseModalSvg /></ModalDelete>
        </ModalHeader>
        <ModalTitle><h4>유저 추가</h4></ModalTitle>
        <ModalDescription>
          <div>
            <Label>이름</Label>
            <input name='name' onChange={changeInputs} />
          </div>
          <div>
            <Label>이메일</Label>
            <input name='email' onChange={changeInputs} />
          </div>
          <div>
            <Label>관계</Label>
            <input name='relationship' onChange={changeInputs} />
          </div>
        </ModalDescription>
        <ModalButton onClick={sendToServer}>추가</ModalButton>

      </Modal>
    </>
  );
}

export default Sendermanagement;