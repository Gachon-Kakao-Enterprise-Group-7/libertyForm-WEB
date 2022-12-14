import axios from 'axios';
import React, { useEffect } from 'react';
import { REDIRECT_URI, REST_API_KEY } from './OAuth';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
// import RotateLoader from "react-spinners/RotateLoader";
import loadingimage from "img/loading.gif"
import background from "svg/register_background.svg"

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

const MainDiv = styled.div`
    width: 50vw;
    height: 100vh;
    margin: auto;
    text-align: center;
`
const LoadingDiv = styled.div`
    width: 100%;
    margin: auto;
    padding-top: 10vh;
    padding-bottom: 10vh;
    text-align: center;
`

//1 : 카카오에 로그인할껀데 사용자 동의(약관) 받았으니까 인가 토큰 주세요 하는 과정
//2 : 인가 토큰을 가지고 백엔드에 보내주면 백엔드에 카카오에 처리 후 이메일, 이름, jwt를 반환


function Kakaologin() {

    const PARAMS = new URL(document.location).searchParams;
    const KAKAO_CODE = PARAMS.get('code')

    const dispatch = useDispatch()
    const saveSurveyData = () => {
        const jwt = localStorage.getItem('jwt')
        axios.get(`${process.env.REACT_APP_DB_HOST}/survey`, {
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



    const getKakaoToken = async () => {
        //1
        const kakaoTokenLink = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        await axios.post(kakaoTokenLink,
            {
                headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
            })
            .then(res => {
                localStorage.setItem('token', res.data.access_token)
                window.location.reload()
            })
            .catch((Error) => {
                console.log(Error)
            })


        //2
        const jsontoken = { accessToken: localStorage.getItem('token') }

        await axios.post(`${process.env.REACT_APP_DB_HOST}/login/kakao`, jsontoken)
            .then(res => {
                console.log('axios성공')
                localStorage.removeItem('token')
                localStorage.setItem('email', res.data.result.email);
                localStorage.setItem('name', res.data.result.name);
                localStorage.setItem('jwt', res.data.result.jwt);
            })
            .catch((Error) => { console.log(Error) })

        saveSurveyData()
        goHomePage()
    }


    useEffect(() => {
        getKakaoToken();
    }, [])


    return (
        <Backgrounddiv>
            <MainDiv>
                <LoadingDiv>
                    {/* <RotateLoader color="rgba(255, 237, 4, 1)" margin={50} size={50}/> */}
                    <img style={{ width: '1000px' }} alt='' src={loadingimage}></img>
                </LoadingDiv>
                <h3 style={{ fontSize: '2em', fontWeight: 'bold' }}>로그인 중입니다...</h3>
            </MainDiv>
        </Backgrounddiv>
    );
}

export default Kakaologin;