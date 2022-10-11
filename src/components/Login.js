import React, { useEffect, useState } from 'react';
import styled from 'styled-components'; // styled components 사용 -> CSS in Js
//rest api

import { useDispatch, useSelector } from 'react-redux';

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
        </Backgrounddiv>
    );
}
  
export default Login;