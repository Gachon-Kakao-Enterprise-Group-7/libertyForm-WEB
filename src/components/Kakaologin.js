import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { REDIRECT_URI, REST_API_KEY } from './OAuth';
import sang from '../img/sang.png'
import styled from 'styled-components';

const SangDiv = styled.div`

    background-image: url(${sang});
    width: 50vw;
    height: 50vh;
`


function Kakaologin() {

    const reload = () => {
        window.location.reload()
    }


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
                    localStorage.setItem('token', data.access_token);
                    window.location.reload()
                } else {
                    console.log('fetch에러')
                }
            })

        const jsontoken = { 'accessToken': localStorage.getItem('token') }

        axios.post("/login/kakao", jsontoken)
            .then(res => {
                console.log('axios성공')
                localStorage.setItem('email', res.data.result.email);
                localStorage.setItem('name', res.data.result.name);
                localStorage.setItem('jwt', res.data.result.jwt);
                document.location.href = '/'
            })
            .catch((Error) => { console.log(Error) })


    }



    useEffect(() => {
        getKakaoToken();
    }, [])


    return (
        <div>
            로딩중....
            <SangDiv>1</SangDiv>
        </div>
    );
}

export default Kakaologin;