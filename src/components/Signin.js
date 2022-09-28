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
    padding-top: 3vw;
    text-align: center;
    align-items: center;
    margin: auto;
    background-color: white;
    width: 70%;
    height: 50em;
    border-radius: 2vw;
`


function Signin() {

    const dispatch = useDispatch()  // useDispatch를 이용해 reducer로 action을 보낸다.
    const state = useSelector((state) => state) // useSelector를 이용해 state값을 사용 할 수 있게 한다

    useEffect(() => {
        console.log(state)
    }, [state]) // 의존성 배열에 state를 넣어서 state값이 바뀔때마다 state값을 보여준다. state를 통해서 USER가 등록되었는지 확인 가능하다.

    const [inputs, setInputs] = useState({
        id: '',
        password: '',
        confirmpassword: '',
        email: '',
        name: '',
        phonenumber: ''
    })

    const { id, password, confirmpassword, email, name, phonenumber } = inputs // 구조분해할당

    const onChange = (e) => {
        const { name, value } = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onSummit = () => {
        dispatch({ type: 'SIGNINUSER', data: inputs })
        setInputs({
            id: '',
            password: '',
            confirmpassword: '',
            email: '',
            name: '',
            phonenumber: ''
        })
        alert("유저 등록완료!")
    }

    const onCheckId = () => {
        dispatch({ type: 'OVERLAPCHECKID', data: id })
    }

    return (
        <Backgrounddiv>
            <Signindiv>
                <h1 style={{ fontSize: '3vw' }} >CREATE AN ACCOUNT</h1>
                <Box
                    sx={{

                        maxWidth: '70%',
                        margin: 'auto',
                        background: 'white'
                    }}
                >


                    <TextField style={{ width: '60%' }} label="ID" id="fullWidth" required margin="normal" onChange={onChange} name="id" value={id} ></TextField>
                    <Button className='mt-4 m-3' variant="contained" size="large" style={{ backgroundColor: 'gray' }} onClick={onCheckId} >ID중복확인</Button>
                    <TextField fullWidth label="PASSWORD" id="fullWidth" required margin="normal" type="password" onChange={onChange} name="password" value={password} />
                    {inputs.password.length < 8 && inputs.password.length > 0 && <span style={{ color: 'red' }}>Password must be at least 8 digits<br /></span>}
                    <TextField fullWidth label="CONFIRM PASSWORD" id="fullWidth" required margin="normal" type="password" onChange={onChange} name="confirmpassword" value={confirmpassword} />
                    {inputs.password !== inputs.confirmpassword && inputs.confirmpassword.length > 0 && <span style={{ color: 'red' }}>Mismatched passwords<br /></span>}
                    <TextField fullWidth label="Name" id="fullWidth" required margin="normal" onChange={onChange} name="name" value={name} />
                    <TextField fullWidth label="PHONE NUMBER(- 없이 입력하세요)" id="fullWidth" required margin="normal" onChange={onChange} name="phonenumber" value={phonenumber} />
                    <TextField fullWidth label="EMAIL" id="fullWidth" required margin="normal" type="email" onChange={onChange} name="email" value={email} />
                    {inputs.email.indexOf('@') < 0 && inputs.email.length > 0 && <span style={{ color: 'red' }}>Doesn't fit the email format<br /></span>}
                    <Button className='mt-3' variant="contained" size="large" style={{ backgroundColor: 'gray' }} onClick={onSummit} >등록하기</Button>
                    <br />
                    <div className='mt-3'>Have already an account? Login here</div>
                    <Button className='mt-4' style={{ backgroundColor: 'yellow', color: 'black', width: '80%' }} variant="contained" >카카오 로그인</Button>
                </Box>
            </Signindiv>
        </Backgrounddiv>
    );
}

export default Signin;