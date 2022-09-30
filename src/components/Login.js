import React, { useEffect, useState } from 'react';

import background from "../img/background.jpg"
import styled from 'styled-components'; // styled components 사용 -> CSS in Js

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';


const Backgrounddiv = styled.div` // styled components를 사용하여 div를 만듬
    background-image: url(${background});
    margin:0px;
    width:100vw;
    height:100vh;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.85;
`

const Signindiv = styled.div`
    text-align: center;
    align-items: center;
    margin: auto;
    background-color: white;
    width: 30em;
    height: 50em;
    border-radius: 2vw;
`


function Login() {
  
    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        id: '',
        password: '',
    })

    const { id, password,  } = inputs // 구조분해할당

    const onChange = (e) => {
        const { name, value } = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }


    const onLogin = () => {
        dispatch({ type: 'LOGIN', data: inputs })
        setInputs({
            id: '',
            password: '',
        })
    }

    return (
        <Backgrounddiv>
            <Signindiv>
                <h1>LOGIN</h1>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '70%',
                        margin: 'auto',
                        background: 'white' //작업할때 배경 범위 보고싶으면 색변경 하면됨
                    }}
                >
                    <TextField //id부분
                        fullWidth 
                        label="ID" 
                        id="fullWidth" 
                        required 
                        margin="normal" 
                        onChange={onChange}
                        name="id" 
                        value={id} 
                    />
                    <TextField //password 부분
                        fullWidth 
                        label="PASSWORD" 
                        id="fullWidth" 
                        required 
                        margin="normal" 
                        type="password" 
                        onChange={onChange} 
                        name="password" 
                        value={password}
                    />
                    <Button //등록버튼
                        className='mt-3' 
                        variant="contained" 
                        size="large" 
                        style={{ backgroundColor: 'gray' }} 
                        onClick={onLogin} >로그인
                    </Button>
                    <hr />
                    <Button //카카오 소셜 로그인
                        className='mt-3' 
                        variant="contained" 
                        style={{ backgroundColor: 'yellow', width:'80%', color:'black' }} 
                         >카카오 로그인
                    </Button>
                    <div>현재 로그인되어 있는 ID : {localStorage.getItem('id')}</div>
                    <div>현재 로그인되어 있는 PASSWORD : {localStorage.getItem('password')}</div>
                    <button >LOGOUT</button>
                </Box>
            </Signindiv>
        </Backgrounddiv>
    );
}

export default Login;