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

import {KAKAO_AUTH_URL} from './OAuth';  





function Login() {

    const dispatch = useDispatch()

    const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; 

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })

    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const { email, password } = inputs // 구조분해할당


    const onLogin = () => {

        inputs.email.indexOf('@') >= 0 && inputs.email.length > 0 && inputs.password.length > 0 && regPass.test(password) //여기 조건이 모두 만족할때, ?뒤에 문장 실행, 하나라도 거짓일 경우 :뒤에 문장 실행
        ?axios.post("/login", inputs)

            .then(res => {

                // { test id
                //     "email": "forceTlight@gmail.com",
                //     "password": "1q2w3e4r!"
                //   }

                console.log(res.data)

                switch (res.data.code) {
                    case 2007:
                        alert('아이디, 비밀번호가 일치하지 않습니다.')
                        break;
                    case 1000:
                        console.log('======================', '로그인 성공', res.data.code)
                        alert('로그인 성공')
                        localStorage.setItem('email', res.data.result.email);
                        localStorage.setItem('name', res.data.result.name);
                        localStorage.setItem('token', res.data.result.jwt);
                        document.location.href = '/' // 작업 완료 되면 페이지 이동(새로고침)
                        break;
                    default:
                        console.log('정의되지 않은 오류입니다....')
                        break;
                }



            })
            .catch((Error) => { console.log(Error) })
            :alert('잘못된 정보가 있습니다. 변경해주세요!')
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
                        <CardButton type="button " onClick={() => { onLogin() }}>Login</CardButton>
                    </CardFieldset>

                    <CardFieldset>
                        <CardOptionsNote>Or sign up with</CardOptionsNote>
                    </CardFieldset>
                    <br></br>

                    <a href={KAKAO_AUTH_URL}>
                        <KaKaoBtn>
                        </KaKaoBtn>
                    </a>
                    
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