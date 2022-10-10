import React, { useEffect, useState } from 'react';

import background from "../img/background1.jpg"
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


function Signin() {
    const dispatch = useDispatch()  // useDispatch를 이용해 reducer로 action을 보낸다.
    const state = useSelector((state) => state) // useSelector를 이용해 state값을 사용 할 수 있게 한다

    // useEffect(() => {
    //     console.log(state)
    // }, [state]) // 의존성 배열에 state를 넣어서 state값이 바뀔때마다 state값을 보여준다. state를 통해서 USER가 등록되었는지 확인 가능하다.


    console.log(state)

    const [inputs, setInputs] = useState({
        id: '',
        password: '',
        confirmpassword: '',
        email: '',
        name:'',
        phone:''
    })

    const { id, password, confirmpassword, email,name, phone  } = inputs // 구조분해할당

    const onChange = (e) => {
        const { name, value } = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onBlur =()=>{
        dispatch({type:'CHECKID', data:id})
    }

    const onSummit = () => {
        dispatch({ type: 'SIGNINUSER', data: inputs })
        setInputs({
            id: '',
            password: '',
            confirmpassword: '',
            email: '',
            name:'',
            phone:''
        })
        alert("유저 등록완료!")
    }

    return (
        <Backgrounddiv>
            <Signindiv>
                <h1>CREATE AN ACCOUNT</h1>
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
                        onBlur={onBlur}
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
                    { inputs.password.length < 8 && inputs.password.length>0 &&<span style={{ color:'red' }}>Password must be at least 8 digits<br /></span> }
                    {/* 비밀번호 자리수가 8자리 이후면 오류 메세지 출력 */}
                    <TextField //confirmpassword부분
                        fullWidth 
                        label="CONFIRM PASSWORD" 
                        id="fullWidth" 
                        required margin="normal" 
                        type="password" 
                        onChange={onChange} 
                        name="confirmpassword" 
                        value={confirmpassword} 
                    />
                    { inputs.password !== inputs.confirmpassword && inputs.confirmpassword.length >0 && <span style={{ color:'red' }}>Mismatched passwords<br/></span> }
                    {/* 확인비밀번호와 비밀번호가 일치하지 않으면 오류 메세지 출력 */}
                    <TextField //email부분
                        fullWidth label="EMAIL" 
                        id="fullWidth" 
                        required 
                        margin="normal" 
                        type="email" 
                        onChange={onChange} 
                        name="email" 
                        value={email} 
                    />
                    { inputs.email.indexOf('@') < 0 && inputs.email.length > 0 && <span style={{ color:'red' }}>Doesn't fit the email format<br /></span>}
                    {/* 이메일 형식 안맞으면 오류메세지 코드 작성 부분 */}
                        <TextField //name부분
                        fullWidth 
                        label="NAME" 
                        id="fullWidth" 
                        required 
                        margin="normal" 
                        onChange={onChange} 
                        name="name" 
                        value={name} 
                    />
                    <TextField //phone부분
                        fullWidth label="PHONE" 
                        id="fullWidth" 
                        required 
                        margin="normal" 
                        onChange={onChange} 
                        name="phone" 
                        value={phone} 
                    />
                    <Button //등록버튼
                        className='mt-3' 
                        variant="contained" 
                        size="large" 
                        style={{ backgroundColor: 'gray' }}
                        onClick={onSummit} >등록하기
                    </Button>
                    <br />
                    <div className='mt-3'>Have already an account? Login here</div>
                    <hr />
                    <Button //카카오 소셜 로그인
                        className='mt-3' 
                        variant="contained" 
                        style={{ backgroundColor: 'yellow', width:'80%', color:'black' }} 
                         >카카오 회원가입
                    </Button>
                </Box>
            </Signindiv>
        </Backgrounddiv>
    );
}

export default Signin;