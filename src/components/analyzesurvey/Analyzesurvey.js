import React from 'react';
import styled from 'styled-components' ;
import Emotionquestion from './Emotionquestion';

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
                        value: 120
                    },
                    {
                        choice: '배',
                        value: 312
                    },
                    {
                        choice: '귤',
                        value: 122
                    },
                    {
                        choice: '감',
                        value: 211
                    },
                    {
                        choice: '복숭아',
                        value: 504
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
                        value: 123
                    },
                    {
                        choice: 'Pagani',
                        value: 352
                    },
                    {
                        choice: 'Koenigsegg',
                        value: 222
                    },
                    {
                        choice: 'Bugatti',
                        value: 411
                    },
                    {
                        choice: 'Lotus',
                        value: 204
                    },
                    {
                        choice: 'BMW',
                        value: 233
                    }
                ]
            }
        ]
    }

                
        
    return (
        <>
            <HeaderContent>
                <div>
                    <Text1>환영합니다,</Text1>
                    <Text2>설문 결과 분석 페이지입니다.</Text2>
                </div>
            </HeaderContent>

            {backendData.questions.map((question, index) => {
                switch(question.questionType){
                    case 1:
                    case 2:
                        return(<Subjectivequestion key={index+1} question={question}></Subjectivequestion>)
                    case 3:
                    case 4:
                        return (<Objectivequestion key={index+1} question={question}></Objectivequestion>)
                    case 5:
                        return(<Emotionquestion key={index+1} question={question}></Emotionquestion>)
                    case 6:
                        return(<Linearquestion key={index+1} question={question}></Linearquestion>)
                    

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