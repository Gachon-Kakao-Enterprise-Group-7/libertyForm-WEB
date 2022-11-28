import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditSurvey() {

    const [loading, setLoading] = useState(false);
    const [surveyDetail, setSurveyDetail] = useState(false)
    const surveyCode = useParams().surveyCode;

    useEffect(() => {
        setLoading(true)
        const jwt = localStorage.getItem('jwt')
        axios.get(`${process.env.REACT_APP_DB_HOST}/survey/${surveyCode}`, {
          headers: {
            Authorization: 'Bearer ' + jwt
          }
        })
          .then((res) => {
            switch(res.data.code){
                case 1000:
                    // console.log(res.data.result, 'raw데이터')
                    const choiceQuestions = res.data.result.choiceQuestions.map((item)=>( // choiceQuestions 데이터 전처리 과정
                        {
                            ...item.question, choices:item.choices
                        }
                    ))
                    setSurveyDetail((prev)=>({
                        survey:res.data.result.survey,
                        questions:[...res.data.result.questions, ...choiceQuestions].sort(function (a, b) {return a.number - b.number}) // res.data에 있는 객관식과 주관식을 하나의 배열로 합치고, 문제 번호순으로 정렬
                    }))
                    setLoading(false)
                    break;
                default:
                    console.log(res.data)
                    break;
            }
          })
          .catch((Error) => {
            console.log(Error)
          })
      }, [])

  

  if(loading)return(<div>로딩중</div>)
  if(!surveyDetail)return(<div>데이터안받아와짐</div>)
  
  return (
    <div>
        {console.log(surveyDetail)}
        {surveyDetail.questions.map((question)=>(
            <div>123</div>
        ))}
        123
    </div>
  );
}

export default EditSurvey;


