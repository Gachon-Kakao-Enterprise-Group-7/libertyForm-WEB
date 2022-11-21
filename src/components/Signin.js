import styled from "styled-components"
import React, { useState } from 'react';
import { motion } from "framer-motion"
import Swal from "sweetalert2";
import axios from 'axios';

import background from "../img/register_background.svg";

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
  transition: all 0.01s ease-out;
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

function Signin() {

    const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; //비밀번호 정규식


    // useEffect(() => {
    //     console.log(state)
    // }, [state]) // 의존성 배열에 state를 넣어서 state값이 바뀔때마다 state값을 보여준다. state를 통해서 USER가 등록되었는지 확인 가능하다.


    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        checkPassword: '',
        name: '',
    })

    const { email, password, checkPassword, name } = inputs // 구조분해할당

    const onChange = (e) => {
        const { name, value } = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    // const onBlur =()=>{
    //     dispatch({type:'CHECKID', data:id})
    // }

    const onSummit = () => {

        inputs.email.indexOf('@') >= 0 && inputs.email.length > 0 && inputs.password.length > 0 && regPass.test(password) && inputs.password === inputs.checkPassword //여기 조건이 모두 만족할때, ?뒤에 문장 실행, 하나라도 거짓일 경우 :뒤에 문장 실행
            ? axios.post("/members", inputs)

                .then(res => {
                    console.log(res)

                    switch (res.data.code) {
                        case 2005:
                            Swal.fire({
                                title: 'Error!',
                                text: '중복된 이메일입니다',
                                icon: 'error',
                                confirmButtonText: '확인'
                            })
                            break;
                        case 1000:
                            console.log('======================', '회원가입 성공', res.data.code)
                            Swal.fire({
                                title: 'Success!',
                                text: '회원가입 성공',
                                icon: 'success',
                                confirmButtonText: '확인'
                            })
                            document.location.href = '/login'
                            break;
                        default:
                            console.log('정의되지 않은 오류입니다....')
                            break;
                    }

                })
                .catch((Error) => { console.log(Error) })
            : Swal.fire({
                title: 'Error!',
                text: '잘못된 정보가 있습니다. 변경해주세요!',
                icon: 'error',
                confirmButtonText: '확인'
            })



    }

    return (
        <Backgrounddiv>
            <CardWrapper initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
                <CardHeader>
                    <CardHeading>회원가입</CardHeading>
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

                        {inputs.email.indexOf('@') < 0 && inputs.email.length > 0 && <span style={{ color: 'red' }}>이메일 형식이 맞지 않습니다.<br /></span>}
                        {/* 이메일 형식 안맞으면 오류메세지 코드 작성 부분 */}
                    </CardFieldset>
                    <CardFieldset>
                        <CardInput
                            placeholder="Password"
                            type="password"
                            onChange={onChange}
                            name="password"
                            value={password}
                            required />
                        {!regPass.test(password) && inputs.password.length > 0 && <span style={{ color: 'red' }}>비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상이어야 합니다<br /></span>}
                        {regPass.test(password) && <span style={{ color: 'black' }}>안전한 비밀번호에요!<br /></span>}

                        {/* 비밀번호 자리수가 8자리 이후면 오류 메세지 출력 */}
                    </CardFieldset>
                    <CardFieldset>
                        <CardInput
                            placeholder="Confirm Password"
                            type="password"
                            onChange={onChange}
                            name="checkPassword"
                            value={checkPassword}
                            required />
                    </CardFieldset>
                    {inputs.password !== inputs.checkPassword && inputs.checkPassword.length > 0 && <span style={{ color: 'red' }}>비밀번호가 올바르지 않습니다.<br /></span>}
                    {/* 확인비밀번호와 비밀번호가 일치하지 않으면 오류 메세지 출력 */}
                    <CardFieldset>
                        <CardInput
                            placeholder="Name"
                            type="text"
                            onChange={onChange}
                            name="name"
                            value={name}
                            required />
                    </CardFieldset>

                    <CardFieldset style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <CardButton type="button" onClick={onSummit}>회원가입</CardButton>
                    </CardFieldset>
                    <hr />
                    <CardFieldset>
                        <CardLink href="/login">계정이 이미 존재하시나요?</CardLink>
                    </CardFieldset>
                </CardBody>
            </CardWrapper>
        </Backgrounddiv>
    );
}

export default Signin;