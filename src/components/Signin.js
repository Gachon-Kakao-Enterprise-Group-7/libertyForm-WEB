import React, { useEffect, useState } from 'react';
import styled from 'styled-components'; // styled components 사용 -> CSS in Js
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


function Signin() {
    const dispatch = useDispatch()  // useDispatch를 이용해 reducer로 action을 보낸다.
    const state = useSelector((state) => state) // useSelector를 이용해 state값을 사용 할 수 있게 한다

    // useEffect(() => {
    //     console.log(state)
    // }, [state]) // 의존성 배열에 state를 넣어서 state값이 바뀔때마다 state값을 보여준다. state를 통해서 USER가 등록되었는지 확인 가능하다.


    console.log(state)

    const [inputs, setInputs] = useState({
        id: '',
        password: '',
        confirmpassword: '',
        name:'',
    })

    const { id, password, confirmpassword,name } = inputs // 구조분해할당

    const onChange = (e) => {
        const { name, value } = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onBlur =()=>{
        dispatch({type:'CHECKID', data:id})
    }

    const onSummit = () => {
        dispatch({ type: 'SIGNINUSER', data: inputs })
        setInputs({
            id: '',
            password: '',
            confirmpassword: '',
            name:'',
        })
        alert("유저 등록완료!")
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
                    name="id" 
                    value={id}
                    required />

                    { inputs.id.indexOf('@') < 0 && inputs.id.length > 0 && <span style={{ color:'red' }}>Doesn't fit the email format<br /></span>}
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
            </CardFieldset>
                { inputs.password.length < 8 && inputs.password.length>0 &&<span style={{ color:'red' }}>Password must be at least 8 digits<br /></span> }
                {/* 비밀번호 자리수가 8자리 이후면 오류 메세지 출력 */}

            <CardFieldset>
                <CardInput 
                    placeholder="Confirm Password" 
                    type="password" 
                    onChange={onChange} 
                    name="confirmpassword" 
                    value={confirmpassword}
                    required />
                <CardIcon className="fa fa-eye" eye small />
            </CardFieldset>    
                    { inputs.password !== inputs.confirmpassword && inputs.confirmpassword.length >0 && <span style={{ color:'red' }}>Mismatched passwords<br/></span> }
                    {/* 확인비밀번호와 비밀번호가 일치하지 않으면 오류 메세지 출력 */}
<<<<<<< Updated upstream
                    <TextField //email부분
                        fullWidth label="EMAIL" 
                        id="fullWidth" 
                        required 
                        margin="normal" 
                        type="email" 
                        onChange={onChange} 
                        name="email" 
                        value={email} 
                    />
                    { inputs.email.indexOf('@') < 0 && inputs.email.length > 0 && <span style={{ color:'red' }}>Doesn't fit the email format<br /></span>}
                    {/* 이메일 형식 안맞으면 오류메세지 코드 작성 부분 */}
                        <TextField //name부분
                        fullWidth 
                        label="NAME" 
                        id="fullWidth" 
                        required 
                        margin="normal" 
                        onChange={onChange} 
                        name="name" 
                        value={name} 
                    />
                    <TextField //phone부분
                        fullWidth label="PHONE" 
                        id="fullWidth" 
                        required 
                        margin="normal" 
                        onChange={onChange} 
                        name="phone" 
                        value={phone} 
                    />
                    <Button //등록버튼
                        className='mt-3' 
                        variant="contained" 
                        size="large" 
                        style={{ backgroundColor: 'gray' }}
                        onClick={onSummit} >등록하기
                    </Button>
                    <br />
                    <div className='mt-3'>Have already an account? Login here</div>
=======
                    
                
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

                    <KaKaoBtn/>
                    
>>>>>>> Stashed changes
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