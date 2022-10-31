const initialstate = []


export default function surveyReducer(state = initialstate, action) {
    switch (action.type) {
        case 'SURVEYTEST':
            console.log('s테스트가 정상적으로 들어옵니다!')
            return state
        // case 'SURVEYSUMMIT':
        //     const title = action.title
        //     const survey = action.survey
        //     return [...state, { surveyId: 11, title: title, question: survey.length, finish: false, survey }]
        // case 'DELSURVEY':
        //     const checkDelete = window.confirm('정말로 삭제하시겠습니까?')
        //     if (checkDelete) {
        //         const surveyid = action.data.surveyId // 내가 삭제하기 버튼을 누른 설문의 id 
        //         console.log('추후에 삭제 백엔드에 요청')
        //         return state
        //     }
        //     else {
        //         return state
        //     }
        // case 'ADDSURVEY':
        //     console.log('redux에 survey를 등록하도록 하겠습니다!')
        //     alert('정상적으로 등록되었습니다!')
        //     return [...state, action.data]
        case 'ADDPREVIEWSURVEY':
            return {...state, previewsurvey:action.data}
        default:
            return state
    }
}