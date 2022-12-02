import React, { useEffect, useState } from 'react';
import styled from 'styled-components' ;
import Emotionquestion from './Emotionquestion';
import axios from 'axios';

import Linearquestion from './Linearquestion';
import Subjectivequestion from './Subjectivequestion';
import Objectivequestion from './Objectivequestion';


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


function Analyzesurvey() {

    const [result, setResult] = useState(null)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DB_HOST}/analysis/load/${177}`, {
            headers: {
                Authorization: 'Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJqd3RJbmZvIjp7Im1lbWJlcklkIjo4fSwiaWF0IjoxNjY5OTQ4NjQzLCJleHAiOjE2NzE3MjY3MDh9.cNlm-qfKx_9CgPd8w5cD2GCtmiRJca8vhQ-pbmsE9Lg'
            }
        })
            .then((res) => {
                switch(res.data.code){
                    case 1000:
                        setResult({
                            ...res.data.result, 
                            questions:[
                                ...res.data.result.choiceResponses, // 객관식설문
                                ...res.data.result.numericResponses, //감정바, 선형배율 설문
                                ...res.data.result.textResponses //주관식설문
                            ].sort(function (a, b) {return a.question.number - b.question.number}) // 질문번호를 기준으로 정렬
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
    },[])

    // useEffect(()=>{
    //     console.log(result)
    // },[result])


    const backendData = {
        questions: [
            {
                number: 1,
                questionType: 6,
                title: '이 상품이 당신에게 얼마나 도움이 되었나요?',
                result: [
                    {
                        type: 'verybad',
                        value: 15
                    },
                    {
                        type: 'bad',
                        value: 32
                    },
                    {
                        type: 'good',
                        value: 21
                    },
                    {
                        type: 'verygood',
                        value: 50
                    }

                ]
            },
            {
                number: 2,
                questionType: 6,
                title: '이 교육과정이 당신에게 얼마나 도움이 되었나요?',
                result: [
                    {
                        type: 'verybad',
                        value: 123
                    },
                    {
                        type: 'bad',
                        value: 32
                    },
                    {
                        type: 'good',
                        value: 211
                    },
                    {
                        type: 'verygood',
                        value: 504
                    }

                ]
            },
            {
                number:3,
                questionType:5,
                title:'오늘 기분은 어때요??',
                result:[
                    {
                        type: '매우나쁨😫',
                        value: 123
                    },
                    {
                        type: '나쁨😑',
                        value: 32
                    },
                    {
                        type: '보통😶',
                        value: 122
                    },
                    {
                        type: '좋음😊',
                        value: 211
                    },
                    {
                        type: '매우좋음😍',
                        value: 504
                    }

                ]
            },
            {
                number: 4,
                questionType: 3,
                title: '좋아하는 과일을 하나만 선택해주세요',
                result: [
                    {
                        choice: '사과',
                        count: 120
                    },
                    {
                        choice: '배',
                        count: 312
                    },
                    {
                        choice: '귤',
                        count: 122
                    },
                    {
                        choice: '감',
                        count: 211
                    },
                    {
                        choice: '복숭아',
                        count: 504
                    }
                ]
            },
            {

                number:5,
                questionType:5,
                title:'이 음식을 먹었을때 기분이 어떤가요?',
                result:[
                    {
                        type:'매우나쁨😫',
                        value:12
                    },
                    {
                        type:'나쁨😑',
                        value:32
                    },
                    {
                        type:'보통😶',
                        value:12
                    },
                    {
                        type:'좋음😊',
                        value:411
                    },{
                        type:'매우좋음😍',
                        value:504
                    }

                ]            
            },
            {
                number:6,
                questionType:2,
                title:'당신이 좋아하는 캐릭터는 무엇인가요?',
                result:['춘식', '어피치','죠르디','라이언','네오','제이지','프로도'
                        ,'튜브','무지','콘','라이언','네오','제이지','프로도','튜브','무지','콘', '어피치','죠르디','라이언'
                        ,'네오','제이지', '어피치','죠르디','라이언','네오','제이지','춘식', '어피치','죠르디','라이언','네오'
                        ,'제이지', '어피치','죠르디','라이언','네오','제이지','춘식', '어피치','죠르디','라이언','네오','제이지'
                        , '어피치','죠르디','라이언','네오','제이지','춘식', '어피치','죠르디','라이언','네오','제이지', '어피치'
                        ,'죠르디','라이언','네오','제이지','춘식', '어피치','죠르디' ,'춘식','춘식','춘식','춘식','춘식','춘식','춘식','춘식'
                    ]            
            },
            {
                number: 7,
                questionType: 4,
                title: '좋아하는 자동차 제조사를 선택해주세요(중복가능)',
                result: [
                    {
                        choice: 'Mercedes-Benz',
                        count: 123
                    },
                    {
                        choice: 'Pagani',
                        count: 352
                    },
                    {
                        choice: 'Koenigsegg',
                        count: 222
                    },
                    {
                        choice: 'Bugatti',
                        count: 411
                    },
                    {
                        choice: 'Lotus',
                        count: 204
                    },
                    {
                        choice: 'BMW',
                        count: 233
                    }
                ]
            }
        ]
    }


    if(!result)return(<div>result값 수신중</div>)
        
    return (
        <>
            <HeaderContent>
                <div>
                    <Text1>환영합니다,</Text1>
                    <Text2>설문 결과 분석 페이지입니다.</Text2>
                </div>
            </HeaderContent>

            {/* {backendData.questions.map((question, index) => {
                switch(question.questionType){
                    case 1:
                    case 2:
                        return(<Subjectivequestion key={index+1} question={question}></Subjectivequestion>)
                        
                    case 3:
                    case 4:
                        // return (<Objectivequestion key={index+1} question={question}></Objectivequestion>) //객관식
                        break;
                    case 5:
                        return(<Emotionquestion key={index+1} question={question}></Emotionquestion>)
                    case 6:
                        return(<Linearquestion key={index+1} question={question}></Linearquestion>)             
                    default:
                        break;
                }
            }
            )} */}
            {result.questions.map((question, index) => {
                switch(question.question.questionTypeId){
                    case 1:
                    case 2:
                        return(<Subjectivequestion key={index+1} question={question}></Subjectivequestion>)  
                    case 3:
                    case 4:
                        return (<Objectivequestion key={index+1} question={question}></Objectivequestion>) //객관식
                    case 5:
                        // console.log('5번타입문제입니다.')       
                        break;
                    case 6:
                        // console.log('6번타입문제입니다.')     
                        break;    
                    default:
                        break;
                }
            })}
            <br />

        </>
    );
}

export default Analyzesurvey;