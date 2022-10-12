import React, { useEffect, useState, useNavigate } from 'react';
import styled from 'styled-components'; // styled components 사용 -> CSS in Js
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; //swagger api 요청

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


function Signin() {

    const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; //비밀번호 정규식


    const dispatch = useDispatch()  // useDispatch를 이용해 reducer로 action을 보낸다.
    const state = useSelector((state) => state) // useSelector를 이용해 state값을 사용 할 수 있게 한다

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
        dispatch({ type: 'SIGNINUSER', data: inputs })
        setInputs({
            email: '',
            password: '',
            checkPassword: '',
            name: '',
        })

        axios.post("/members", inputs)

            .then(res => {
                console.log(res)
                console.log("Join Success!")

                alert('회원가입 성공')
                document.location.href = '/login'
            })

            .catch((Error) => { console.log(Error) })
    }

    return (
        <Backgrounddiv>
            <CardWrapper>
                <CardHeader>
                    <CardHeading>Sign in</CardHeading>
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

                        {inputs.email.indexOf('@') < 0 && inputs.email.length > 0 && <span style={{ color: 'red' }}>Doesn't fit the email format<br /></span>}
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
                        <CardIcon className="fa fa-eye" eye small />
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
                        <CardIcon className="fa fa-eye" eye small />
                    </CardFieldset>
                    {inputs.password !== inputs.checkPassword && inputs.checkPassword.length > 0 && <span style={{ color: 'red' }}>Mismatched passwords<br /></span>}
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

                    <CardFieldset>
                        <CardButton type="button " onClick={onSummit}>Sign Up</CardButton>
                    </CardFieldset>

                    <CardFieldset>
                        <CardOptionsNote>Or sign up with</CardOptionsNote>
                    </CardFieldset>
                    <br></br>

                    <KaKaoBtn />

                    <hr />
                    <CardFieldset>
                        <CardLink href="/login">I already have an account</CardLink>
                    </CardFieldset>
                </CardBody>
            </CardWrapper>
        </Backgrounddiv>
    );
}

export default Signin;