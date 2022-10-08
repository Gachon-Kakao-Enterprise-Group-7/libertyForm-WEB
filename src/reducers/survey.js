const initialstate = [
    {
        surveyId: 1,
        title: '제품 만족도 조사',
        question: 15,
        finish: true
    },
    {
        surveyId: 2,
        title: '음식 만족도 조사',
        question: 8,
        finish: true
    },
    {
        surveyId: 3,
        title: '시설 만족도 조사',
        question: 8,
        finish: true
    },
    {
        surveyId: 4,
        title: 'XX제품 만족도 조사',
        question: 15,
        finish: false
    },
    {
        surveyId: 5,
        title: 'XX음식 만족도 조사',
        question: 45,
        finish: true
    },
    {
        surveyId: 6,
        title: 'XX시설 만족도 조사',
        question: 999,
        finish: true
    },
    {
        surveyId: 7,
        title: 'DD제품 만족도 조사',
        question: 15,
        finish: false
    },
    {
        surveyId: 8,
        title: 'DD음식 만족도 조사',
        question: 52,
        finish: false
    },
    {
        surveyId: 9,
        title: 'DD시설 만족도 조사',
        question: 12,
        finish: true
    },
    {
        surveyId: 10,
        title: 'DD시설 만족도 조사',
        question: 12,
        finish: false
    }
]


export default function surveyReducer(state = initialstate, action) {
    switch (action.type) {
        case 'SURVEYTEST':
            console.log('s테스트가 정상적으로 들어옵니다!')
            return state
        case 'SURVEYSUMMIT':
            const title = action.title
            const survey = action.survey
            return [...state, { surveyId: 11, title: title, question: survey.length, finish: false, survey }]
        default:
            return state
    }
}