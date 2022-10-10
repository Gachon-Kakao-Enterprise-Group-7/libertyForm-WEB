import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
=======

import background from "../img/background1.jpg"
>>>>>>> 89261d620cb8509cee14e1aaa9cc5655d339ddc8
import styled from 'styled-components'; // styled components 사용 -> CSS in Js
//rest api

import { useDispatch, useSelector } from 'react-redux';

<<<<<<< Updated upstream
//import IconButton from './gayoung_test/IconButton';
//import { images } from './gayoung_test/images';

=======
import {
    KaKaoBtn,
    Backgrounddiv,
    CardWrapper,
    CardHeader,
    CardHeading,
    CardBody,
    CardIcon,
    CardFieldset,
    CardInput,
    CardOptionsNote,
    CardButton,
    CardLink
  } from "./Card"

  
>>>>>>> Stashed changes




function Login() {
  
    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        id: '',
        password: '',
    })

    const { id, password  } = inputs // 구조분해할당

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
            password: ''
        })
<<<<<<< Updated upstream
=======
        alert("로그인완료!")


    //     function SocialLogin(props, visible) { //카카오 로그인
    //         const [ id, setId ] = useState('');
    //         const [ name, setName ] = useState('');
    //         const [ provider, setProvider ] = useState('');
          
    //       const clickKakaoBtn = (res) => {
    //         fetch('http:///account/sign-in/kakao', {
    //             method: 'POST',
    //             headers: {
    //                 'content-type': 'application/json',
    //               },
    //             body: JSON.stringify({
    //                 access_token : res.response.access_token
    //             })
    //         })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.access_token) {
    //             localStorage.setItem('kakao-token', res.access_token)
    //             alert('로그인을 환영합니다')
    //             props.history.push('/')
    //         } else {
    //             alert('아이디와 비밀번호를 확인해주세요.')
    //         }
    //         })
    //       }
          
        
        
    //     const responseFail = (err) => {
    //     console.error(err)
    //     };
    // }
>>>>>>> Stashed changes
    }

    return (
        <Backgrounddiv>
            <CardWrapper>
                <CardHeader>
                    <CardHeading>Login</CardHeading>
                </CardHeader>

                <CardBody>


                    <CardFieldset>
                        <CardInput 
                        placeholder="E-mail" 
                        type="text" 
                        onChange={onChange}
                        name="id" 
                        value={id}
                        required />
                    </CardFieldset>
                    
                    <CardFieldset>
                        <CardInput 
                        placeholder="Password" 
                        type="password" 
                        onChange={onChange} 
                        name="password" 
                        value={password}
<<<<<<< Updated upstream
                    />
                    <Button //등록버튼
                        className='mt-3' 
                        variant="contained" 
                        size="large" 
                        style={{ backgroundColor: 'gray' }} 
                        href="/"
                        onClick={onLogin} >로그인
                    </Button>
                    <hr />
                    <Button //카카오 소셜 로그인
                        className='mt-3' 
                        variant="contained" 
                        style={{ backgroundColor: 'yellow', width:'80%', color:'black' }} 
                         >카카오 로그인

                    {/* <IconButton type={images.kakao_logoin} /> */}
                    </Button>
                    <div>현재 로그인되어 있는 ID : {localStorage.getItem('id')}</div>
                    <div>현재 로그인되어 있는 PASSWORD : {localStorage.getItem('password')}</div>
                    <button >LOGOUT</button>
                </Box>
            </Signindiv>
=======
                        required />
                        <CardIcon className="fa fa-eye" eye small />
                    </CardFieldset>
                

                    <CardFieldset>
                        <CardButton type="button " onClick={onLogin}>Login</CardButton>
                    </CardFieldset>

                    <CardFieldset>
                        <CardOptionsNote>Or sign up with</CardOptionsNote>
                    </CardFieldset>
                    <br></br>

                    <KaKaoBtn 
                        // jsKey={'카카오개발자 key'}
                        // onSuccess={clickKakaoBtn}
                        // onFailure={responseFail}
                        getProfile="true">
                    </KaKaoBtn>
                                   
                  
                    
                    <hr />
                    <CardFieldset>
                        <CardLink href="/Signin">Don't have an account?</CardLink>
                    </CardFieldset>


                   
                    </CardBody>
            </CardWrapper>
>>>>>>> Stashed changes
        </Backgrounddiv>
    );
}
  
export default Login;