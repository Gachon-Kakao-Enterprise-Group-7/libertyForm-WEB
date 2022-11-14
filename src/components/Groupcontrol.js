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

import { ReactComponent as Add } from "../img/add.svg"
import { ReactComponent as Check } from "../img/checkmark.svg"

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

function Groupcontrol(props) {

    const state = useSelector((state)=>(state.contact))

    
    const [groupValue, setGroupValue] = useState(null);

    let options = [...new Set(state.map((contact)=>(contact.relationship)))] // 사용자의 연락처에서 릴레이션쉽으로 옵션 배열을 만들어 준다


    const addUser = (e) => {
      console.log(e.target.id)
        //발송리스트에 추가하기전에 이미 등록된 사용자이면 추가를 하지 않아야 한다. 로직 추가 필요
        props.setUsers((prev) => ([...new Set([...prev, e.target.id])]))
    }
    
    const addAlluser = (e) =>{
        const temp = state.filter((contact)=>(contact.relationship === groupValue)).map((contact)=>(contact.email))
        props.setUsers((prev) => ([...new Set([...prev, ...temp])]))
    }

  return (
    <div>
        <Text1><div>그룹에서 선택</div><div>{groupValue !== null && <AddBtn onClick={addAlluser}>전체 추가하기</AddBtn>}</div></Text1>
        <Autocomplete // 그룹 선택하는 콤보 박스
            value={groupValue}
            onChange={(event, newGroupValue) => {
            setGroupValue(newGroupValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="그룹을 선택하세요" />}
        />
        {console.log(groupValue)}
        {console.log(state.filter((contact)=>(contact.relationship === groupValue)))}
            
        <div style={{marginTop:'10px'}}>
            {state.filter((contact)=>(contact.relationship === groupValue)).map((contact, index)=>(
                <li key={index}>{contact.name}-------{contact.email}<span id={contact.email} onClick={addUser} style={{cursor:'pointer'}}> +</span></li>
            ))}
        </div>
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350, }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{color:'red'}}>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>이름</TableCell>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>이메일</TableCell>
                            <TableCell align='center' style={{ fontWeight: 'bold' }}>회원여부</TableCell>
                            <TableCell align='center' size='small' style={{ fontWeight: 'bold' }}>추가</TableCell>
                        </TableRow>
                    </TableHead>
                    {state.filter((contact)=>(contact.relationship === groupValue)).map((contact, index)=>(
                      <TableBody key={index}>
                        <TableCell align='center' >{contact.name}</TableCell>
                        <TableCell align='center' >{contact.email}</TableCell>
                        <TableCell align='center' >{contact.member&&<Check width='20px'/>}</TableCell>
                        <TableCell align='center' ><span id={contact.email} onClick={addUser} style={{cursor:'pointer'}}>+</span></TableCell>
                      </TableBody>
                                ))}
                </Table>
            </TableContainer>
    </div>
  );
}

export default Groupcontrol;