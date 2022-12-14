import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Emotionquestion from './Emotionquestion';
import axios from 'axios';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Surveyinfo from './Surveyinfo';
import Linearquestion from './Linearquestion';
import LongSubjectivequestion from './LongSubjectivequestion'
import ShortSubjectivequestion from './ShortSubjectivequestion'
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
                                ...res.data.result.choiceResponses, // ???????????????
                                ...res.data.result.numericResponses, //?????????, ???????????? ??????
                                ...res.data.result.textResponses //???????????????
                            ].sort(function (a, b) { return a.question.number - b.question.number }) // ??????????????? ???????????? ??????
                        })
                        break;
                    default:
                        console.log('????????????')
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
                    <Text1>???????????????,</Text1>
                    <Text2>?????? ?????? ?????? ??????????????????.</Text2>
                </div>
            </HeaderContent>
            <GroupControll>
                <Autocomplete // ?????? ???????????? ?????? ??????
                    value={boxValue}
                    onChange={(event, newBoxValue) => {
                        setBoxValue(newBoxValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: '50%', m: 3 }}
                    renderInput={(params) => <TextField {...params} label="????????? ???????????????" />}
                />
            </GroupControll>

            {result ? <Surveyinfo result={result}></Surveyinfo> : null}

            {result && result.questions.map((question, index) => {
                switch (question.question.questionTypeId) {
                    case 1:
                        return (<LongSubjectivequestion key={index + 1} question={question}></LongSubjectivequestion>) //?????????(?????????)
                    case 2:
                        return (<ShortSubjectivequestion key={index + 1} question={question}></ShortSubjectivequestion>) //?????????(?????????)
                    case 3:
                    case 4:
                        return (<Objectivequestion key={index + 1} question={question}></Objectivequestion>) //?????????
                    case 5:
                        return (<Emotionquestion key={index + 1} question={question}></Emotionquestion>) //?????????
                    case 6:
                        return (<Linearquestion key={index + 1} question={question}></Linearquestion>)//????????????
                    default:
                        break;
                }
            })}
            <br />

        </>
    );
}

export default Analyzesurvey;