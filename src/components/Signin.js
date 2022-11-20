import React, { useState } from 'react';
import axios from 'axios'; //swagger api 요청
import Swal from 'sweetalert2';

import {
    Backgrounddiv,
    CardWrapper,
    CardHeader,
    CardHeading,
    CardBody,
    CardFieldset,
    CardInput,
    CardButton,
    CardLink
} from "./Card";

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
        <div style={{ height: "100vh", width: "100%", position: 'absolute', top: '0px', zIndex: '-1' }}>
            <Backgrounddiv>
                <CardWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
        </div>
    );
}

export default Signin;