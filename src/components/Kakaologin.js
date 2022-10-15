import axios from 'axios';
import React, { useEffect } from 'react';
import { REDIRECT_URI, REST_API_KEY } from './OAuth';


function Kakaologin() {

    const PARAMS = new URL(document.location).searchParams;
    const KAKAO_CODE = PARAMS.get('code')

    const getKakaoToken = () => {
        fetch(`https://kauth.kakao.com/oauth/token`, {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        })
            .then(res => res.json())
            .then(data => {
                if (data.access_token) {
                    console.log(data)
                    localStorage.setItem('token', data.access_token);
                } else {
                    console.log('토큰 저장 실패...')
                }
            })


        const jsontoken = { 'accessToken': localStorage.getItem('token') }
        console.log('인증코드는', KAKAO_CODE)
        console.log('토큰은', localStorage.getItem('token'))
        console.log('json으로 변환한 토큰은', jsontoken)

        axios.post("/login/kakao", jsontoken)
            .then(res => {
                console.log(res.data)
            })
            .catch((Error) => { console.log(Error) })
    }




    useEffect(() => {
        getKakaoToken();
    }, [])

    return (
        <div>
        </div>
    );
}

export default Kakaologin;