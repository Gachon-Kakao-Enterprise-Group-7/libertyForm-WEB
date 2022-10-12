import React, { useEffect, useState } from 'react';
import styled from 'styled-components'; // styled components 사용 -> CSS in Js
//rest api
import axios from 'axios'; //swagger api 요청

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
        email: '',
        password: '',
    })

    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }
 

    const { email, password } = inputs // 구조분해할당
    
    const onLogin = () => {

        setInputs({
            email: '',
            password: '',
        })

    
        axios.post("/login", inputs)
        
        .then(res => {
            console.log(res)
            console.log('res.data.email :: ', res.data.result.email)
            console.log('res.data.password :: ', res.data.result.pasword)

            // {
            //     "email": "forceTlight@gmail.com",
            //     "password": "1q2w3e4r!"
            //   }

            if(res.data.result.email === undefined){
                // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                console.log('======================',res.data.code)
                alert('입력하신 id 가 일치하지 않습니다.')
            } else if(res.data.result.email === null){
                // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
                alert('입력하신 비밀번호 가 일치하지 않습니다.')
            } 
            else if(res.data.result.email === email) {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log('======================','로그인 성공',res.data.code)
                alert('로그인 성공')
                localStorage.setItem('email', res.data.result.email);
                localStorage.setItem('name', res.data.result.name);
                localStorage.setItem('token', res.data.result.jwt);
            }
            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/'
        })
        .catch((Error)=>{console.log(Error)})
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
                        name="email" 
                        value={email}
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
                        <CardButton type="button " onClick={()=>{onLogin()}}>Login</CardButton>
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