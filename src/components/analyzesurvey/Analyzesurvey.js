import React from 'react';
import styled from 'styled-components';
import Emotionquestion from './Emotionquestion';

import Linearquestion from './Linearquestion';

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

    
    const backendData = {
        questions:[
            {
                number:1,
                questionType:6,
                title:'이 상품이 당신에게 얼마나 도움이 되었나요?',
                result:[
                    {
                        type:'verybad',
                        value:15
                    },
                    {
                        type:'bad',
                        value:32
                    },
                    {
                        type:'good',
                        value:21
                    },{
                        type:'verygood',
                        value:50
                    }

                ]            
            },
            {
                number:2,
                questionType:6,
                title:'이 교육과정이 당신에게 얼마나 도움이 되었나요?',
                result:[
                    {
                        type:'verybad',
                        value:123
                    },
                    {
                        type:'bad',
                        value:32
                    },
                    {
                        type:'good',
                        value:211
                    },{
                        type:'verygood',
                        value:504
                    }

                ]            
            },
            {
                number:3,
                questionType:5,
                title:'이 교육과정이 당신에게 얼마나 도움이 되었나요?',
                result:[
                    {
                        type:'매우나쁨😫',
                        value:123
                    },
                    {
                        type:'나쁨😑',
                        value:32
                    },
                    {
                        type:'보통😶',
                        value:122
                    },
                    {
                        type:'좋음😊',
                        value:211
                    },{
                        type:'매우좋음😍',
                        value:504
                    }

                ]            
            },
        ]
    }
    console.log(JSON.stringify(backendData))
//question.questionType === 6 && <Linearquestion question={question}></Linearquestion>
    return (
        <>
            <HeaderContent>
                <div>
                    <Text1>환영합니다,</Text1>
                    <Text2>설문 결과 분석 페이지입니다.</Text2>
                </div>
            </HeaderContent>
            {backendData.questions.map((question) => {
                switch(question.questionType){
                    case 6:
                        return(<Linearquestion question={question}></Linearquestion>)
                    case 5:
                        return(<Emotionquestion question={question}></Emotionquestion>)
                    default:
                        break;
                }
            }
            )}
            <br />
            
        </>
    );
}

export default Analyzesurvey;