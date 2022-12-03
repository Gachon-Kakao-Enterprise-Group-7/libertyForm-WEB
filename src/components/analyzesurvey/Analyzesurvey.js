import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Emotionquestion from './Emotionquestion';
import axios from 'axios';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Linearquestion from './Linearquestion';
import Subjectivequestion from './Subjectivequestion';
import Objectivequestion from './Objectivequestion';

import useDidMountEffect from 'hooks/useDidMountEffect';

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`

const Text1 = styled.span`
  font-size: 24px;
  text-align: left;
  letter-spacing: 0.1px;
  color: #171725;
  @media (max-width: 450px) {
    display: none;
  }
`
const Text2 = styled.span`
  font-size: 18px;
  letter-spacing: 0.1px;
  color: #92929d;
  margin-left: 10px;
  font-family: 'Roboto', sans-serif;
`

const GroupControll = styled.span`
  display : flex;
  justify-content : flex-start;
  align-items: center;
  margin-bottom : 20px;
`

function Analyzesurvey() {

    const [result, setResult] = useState(null)
    const [boxValue, setBoxValue] = useState(null);

    const surveys = useSelector(state => state.survey.previewsurvey)
    const options = surveys.map((survey) => (survey.name))


    useDidMountEffect(() => {
        const surveyId = surveys.filter((survey) => (survey.name === boxValue))[0].surveyId
        const jwt = localStorage.getItem('jwt')
        axios.get(`${process.env.REACT_APP_DB_HOST}/analysis/load/${surveyId}`, {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        })
            .then((res) => {
                switch (res.data.code) {
                    case 1000:
                        console.log(res.data)
                        setResult({
                            ...res.data.result,
                            questions: [
                                ...res.data.result.choiceResponses, // 객관식설문
                                ...res.data.result.numericResponses, //감정바, 선형배율 설문
                                ...res.data.result.textResponses //주관식설문
                            ].sort(function (a, b) { return a.question.number - b.question.number }) // 질문번호를 기준으로 정렬
                        })
                        break;
                    default:
                        console.log('디폴트값')
                        break;
                }

            })
            .catch((Error) => {
                console.log(Error)
            })
    }, [boxValue])

    return (
        <>
            <HeaderContent>
                <div>
                    <Text1>환영합니다,</Text1>
                    <Text2>설문 결과 분석 페이지입니다.</Text2>
                </div>
            </HeaderContent>
            <GroupControll>
                <Autocomplete // 항목 선택하는 콤보 박스
                    value={boxValue}
                    onChange={(event, newBoxValue) => {
                        setBoxValue(newBoxValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: '50%', m: 3 }}
                    renderInput={(params) => <TextField {...params} label="설문을 선택하세요" />}
                />
            </GroupControll>

            {result && result.questions.map((question, index) => {
                switch (question.question.questionTypeId) {
                    case 1:
                    case 2:
                        return (<Subjectivequestion key={index + 1} question={question}></Subjectivequestion>) //주관식
                    case 3:
                    case 4:
                        return (<Objectivequestion key={index + 1} question={question}></Objectivequestion>) //객관식
                    case 5:
                        return (<Emotionquestion key={index + 1} question={question}></Emotionquestion>) //감정바
                    case 6:
                        return (<Linearquestion key={index + 1} question={question}></Linearquestion>)//선형배율
                    default:
                        break;
                }
            })}
            <br />

        </>
    );
}

export default Analyzesurvey;