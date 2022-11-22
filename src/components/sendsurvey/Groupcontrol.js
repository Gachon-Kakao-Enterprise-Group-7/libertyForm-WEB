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

const Text1 = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  text-align: left;
  letter-spacing: 0.1px;
  color: #171725;
  margin-bottom: 10px;
  @media (max-width: 450px) {
    display: none;

  }
`
const AddBtn = styled.button`
    border: 0px;
    color:white;
    background: #ffcd00;
    border-radius: 30px;
`

const StyledAdd = styled(Add)`
  &:active{
    background: #ff7800;
    border-radius: 10px;
  }
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
  console.log(state)
  const [groupValue, setGroupValue] = useState(null);
  let options = [...new Set(state && state.map((contact) => (contact.relationship)))] // 사용자의 연락처에서 릴레이션쉽으로 옵션 배열을 만들어 준다


  const addAlluser = (e) => {
    const temp = state.filter((contact) => (contact.relationship === groupValue)).map((contact) => (contact.email))
    props.setUsers((prev) => ([...new Set([...prev, ...temp])]))
  }

  if(props.users === null){
    return(<div>user값이 존재하지 않는 오류</div>)
  }

  return (
    <div>
      <Title><div>그룹에서 선택</div><div>{groupValue !== null && <AddBtn onClick={addAlluser}>전체 추가하기</AddBtn>}</div></Title>
      <Autocomplete // 그룹 선택하는 콤보 박스
        value={groupValue}
        onChange={(event, newGroupValue) => {
          setGroupValue(newGroupValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300, m: 3 }}
        renderInput={(params) => <TextField {...params} label="그룹을 선택하세요" />}
      />
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