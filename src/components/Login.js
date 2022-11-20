import React, { useState } from 'react';
import axios from 'axios'; //swagger api 요청
import { useDispatch } from 'react-redux';
import { REST_API_KEY, REDIRECT_URI } from './OAuth';
import {
    KaKaoBtn,
    Backgrounddiv,
    CardWrapper,
    CardHeader,
    CardHeading,
    CardBody,
    CardFieldset,
    CardInput,
    CardOptionsNote,
    CardButton,
    CardLink
} from "./Card";
import Swal from 'sweetalert2';


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
                        Swal.fire({
                            title: 'Error!',
                            text: '아이디, 비밀번호가 일치하지 않습니다',
                            icon: 'error',
                            confirmButtonText: '확인'
                        })
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
        <div style={{ height: "100vh", width: "100%", position: 'absolute', top: '0px', zIndex: '-1' }}>
            <Backgrounddiv>
                <CardWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                            <CardOptionsNote>Or sign up with</CardOptionsNote>
                        </CardFieldset>
                        <br></br>


                        <KaKaoBtn onClick={onKakaoLogin}>
                        </KaKaoBtn>


                        <hr />
                        <CardFieldset>
                            <CardLink href="/Signin">계정이 존재하지 않으신가요?</CardLink>
                        </CardFieldset>



                    </CardBody>
                </CardWrapper>
            </Backgrounddiv>
        </div>
    );
}

export default Login;