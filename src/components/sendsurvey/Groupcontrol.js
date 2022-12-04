import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux'

import styled from '@emotion/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ReactComponent as Add } from "svg/add.svg"
import { ReactComponent as Check } from "svg/checkmark.svg"
import { ReactComponent as UserAddSvg } from "svg/adduser.svg"

const AddBtn = styled.button`
  display : flex;
  justify-content: center;
  background: white;
  width: 150px;
  height: 50px;
  color:#ffcd00;
  font-weight: bold;
  font-size: 20px;
  border : 1px solid #ffcd00 ;
  border-radius: 5px;
  margin-left: 10px;
  padding: 10px;

  &:hover{
    background-color : #ffcd00;
    color: white;
    fill: white;
  }

  @media (max-width:1000px) {
    >p{
      display : none;
    }
  }

`
const UserAddSvgW = styled(UserAddSvg)`
  margin-right: 10px; 
  width: 25px;
  height: 25px;
  fill: #ffcd00;  
  :hover{
    fill: white; 
  }
`

const StyledAdd = styled(Add)`
  &:active{
    background: #ff7800;
    border-radius: 10px;
  }
`

const GroupControll = styled.span`
  display : flex;
  justify-content : flex-start;
  align-items: center;
  margin-bottom : 20px;
`

const Title = styled.span`
  font-size: 24px;
  text-align: left;
  letter-spacing: 0.1px;
  color: #171725;
  font-weight: bold;
  margin-bottom : 20px;
`

function Groupcontrol(props) {

  const state = useSelector((state) => (state.contact.contacts))
  const [groupValue, setGroupValue] = useState(null);
  let options = [...new Set(state && state.map((contact) => (contact.relationship)))] // 사용자의 연락처에서 릴레이션쉽으로 옵션 배열을 만들어 준다
  console.log(options)

  const addAlluser = (e) => {
    const temp = state.filter((contact) => (contact.relationship === groupValue)).map((contact) => (contact.email))
    props.setUsers((prev) => ([...new Set([...prev, ...temp])]))
  }

  if (props.users === null) {
    return (<div>user값이 존재하지 않는 오류</div>)
  }

  return (
    <div>
      <Title>그룹에서 선택</Title>
      <GroupControll>
        <Autocomplete // 그룹 선택하는 콤보 박스
          value={groupValue}
          onChange={(event, newGroupValue) => {
            setGroupValue(newGroupValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: '50%', m: 3 }}
          renderInput={(params) => <TextField {...params} label="그룹을 선택하세요" />}
        />
        {groupValue !== null &&
          <AddBtn onClick={addAlluser}><UserAddSvgW /><p>유저 추가</p></AddBtn>}
      </GroupControll>
      {groupValue != null &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350, }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ color: 'red' }}>
                <TableCell align='center' size='small' style={{ fontWeight: 'bold' }}>추가</TableCell>
                <TableCell align='center' style={{ fontWeight: 'bold' }}>이름</TableCell>
                <TableCell align='center' style={{ fontWeight: 'bold' }}>이메일</TableCell>
                <TableCell align='center' style={{ fontWeight: 'bold' }}>회원여부</TableCell>

              </TableRow>
            </TableHead>
            {state.filter((contact) => (contact.relationship === groupValue)).map((contact, index) => (
              <TableBody key={index}>
                <TableCell align='center' padding='none' ><StyledAdd width='15px' height='30px' onClick={() => { props.setUsers((prev) => ([...new Set([...prev, contact.email])])) }} cursor='pointer'></StyledAdd></TableCell>
                <TableCell align='center' padding='none'>{contact.name}</TableCell>
                <TableCell align='center' padding='none'>{contact.email}</TableCell>
                <TableCell align='center' padding='none'>{contact.member && <Check width='20px' />}</TableCell>
                {/*위에 addUser 랑 같은 이벤트 : set을 이용해서 이미 사용자가 있으면 중복 제거된다 */}
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      }
    </div>
  );
}

export default Groupcontrol;