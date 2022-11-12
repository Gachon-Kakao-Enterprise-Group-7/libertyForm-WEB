import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux'


function Groupcontrol(props) {

    const state = useSelector((state)=>(state.contact))

    console.log(state)

    const [groupValue, setGroupValue] = useState('');
    const [groupInputValue, setGroupInputValue] = useState('');

    let options = [...new Set(state.map((contact)=>(contact.relationship)))] // 사용자의 연락처에서 릴레이션쉽으로 옵션 배열을 만들어 준다

    const addUser = (e) => {
        props.setUsers((prev) => ([...prev, { email: e.target.id }]))
    }


  return (
    <div style={{background:'yellow'}}>
      <br />
      <Autocomplete // 그룹 선택하는 콤보 박스
        value={groupValue}
        onChange={(event, newGroupValue) => {
          setGroupValue(newGroupValue);
        }}
        inputValue={groupInputValue}
        onInputChange={(event, newInputValue) => {
          setGroupInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="그룹을 선택하세요" />}
      />
      <>선택하신 그룹은 {groupValue}입니다.</><button>전체 추가하기</button>
      <div>
        {state.filter((contact)=>(contact.relationship === groupValue)).map((contact, index)=>(
            <li>{contact.name}-------{contact.email}<span id={contact.email} onClick={addUser} style={{cursor:'pointer'}}> +</span></li>
        ))}
      </div>
    </div>
  );
}

export default Groupcontrol;