import styled from "styled-components"
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { REST_API_KEY, REDIRECT_URI } from './OAuth';
import { motion } from "framer-motion"

import background from "../img/register_background.svg"
import kakaobtn from "../img/kakao_login_large_wide.png"
import kakaobtn2 from "../img/kakao_login_large_narrow.png"

export const Backgrounddiv = styled.div` // styled components를 사용하여 div를 만듬
  position: absolute;
  top: 0px;
  z-index:-1;
  width:100vw;
  height:100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  place-items: center;  
`;

export const CardWrapper = styled(motion.div)`
  overflow: hidden;
  background-color: white;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 50vmin;
  max-height: 80vmin;
  border-radius: 16px;
  color : black;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.1s ease-out;
`;

export const CardHeader = styled.header`
  padding-top: 50px;
  padding-bottom: 50px;
  @media (max-width: 620px) {
    padding-top: 20px;
    padding-bottom: 10px;
  }
`;

export const CardHeading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  @media (max-width: 620px) {
    font-size: 2rem;
  }
`;

export const CardBody = styled.div`
  padding-right: 50px;
  padding-left: 50px;
`;

export const CardFieldset = styled.fieldset`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;

  & + & {
    margin-top: 30px;
  }

  &:nth-last-of-type(2) {
    margin-top: 16px;
  }

  &:last-of-type {
    text-align: center;
  }
`;

export const CardInput = styled.input`
  padding: 7px 0;
  width: 100%;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  &:focus {
    border-bottom-color: #ff7800;
    outline: 0;
  }
`;

export const CardOptionsNote = styled.small`
  display: block;
  width: 100%;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;

`;


export const CardButton = styled.button`
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  background-color: #ff7800;
  border: 0;
  border-radius: 16px;
  height: 60px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

export const KaKaoBtn = styled.button`
  background-image: url(${kakaobtn});
  background-repeat: no-repeat;
  background-size: cover; 
  width: 100%;
  border: none;
  border-radius: 16px;
  height: 60px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }

  @media (max-width: 800px) {
    background-image: url(${kakaobtn2});
  }
`;

export const CardLink = styled.a`
  color: black;
  margin: 5px;
  display: inline-block;
  font-size: 15px;
  text-decoration: none;
  border-bottom: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
  transition: color 0.25s ease-in;

  &:hover {
    color: #ff7800;
  }

  @media (max-width: 620px) {
    display : none;
  }
`;




function Login() {

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const onKakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

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


    const dispatch = useDispatch();

    const saveSurveyData = () => {
        const jwt = localStorage.getItem('jwt')
        axios.get("/survey", {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        })
            .then((res) => {
                dispatch({ type: 'ADDPREVIEWSURVEY', data: res.data.result.surveys })

            })
            .catch((Error) => {
                console.log(Error)
            })
    }


    const goHomePage = () => {
        setTimeout(() => {
            document.location.href = '/' // 작업 완료 되면 페이지 이동(새로고침)
        }, 1000)

    }


    const onLogin = async () => {

        await axios.post("/login", inputs)
            .then(res => {

                // { test id
                //     "email": "forceTlight@gmail.com",
                //     "password": "1q2w3e4r!"
                //   }

                switch (res.data.code) {
                    case 2007:
                        alert('아이디, 비밀번호가 일치하지 않습니다.')
                        break;
                    case 1000:
                        console.log('======================', '로그인 성공', res.data.code)
                        localStorage.setItem('email', res.data.result.email);
                        localStorage.setItem('name', res.data.result.name);
                        localStorage.setItem('jwt', res.data.result.jwt);
                        break;
                    default:
                        console.log(res.data.code)
                        console.log('정의되지 않은 오류입니다....')
                        break;
                }
            })
            .catch((Error) => { console.log(Error) })

        await saveSurveyData();
        if (localStorage.getItem('email')) {
            goHomePage();
        }
    }

    return (
        <Backgrounddiv>
            <CardWrapper initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
                <CardHeader>
                    <CardHeading>로그인</CardHeading>
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
                    </CardFieldset>
                    <CardFieldset>
                        <CardButton type="button" onClick={() => { onLogin() }}>로그인</CardButton>
                    </CardFieldset>
                    <CardFieldset>
                        <CardOptionsNote>또는</CardOptionsNote>
                    </CardFieldset>
                    <CardFieldset>
                        <KaKaoBtn onClick={onKakaoLogin}/>
                    </CardFieldset>
                    <hr />
                    <CardFieldset>
                        <CardLink href="/Signin">계정이 존재하지 않으신가요?</CardLink>
                    </CardFieldset>
                </CardBody>
            </CardWrapper>
        </Backgrounddiv>
    );
}

export default Login;