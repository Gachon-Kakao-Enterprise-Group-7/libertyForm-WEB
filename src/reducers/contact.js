const initialstate = []

export default function surveyReducer(state = initialstate, action) {
    switch (action.type) {
        case 'TEST':
            console.log('contact테스트 콘솔 메세지입니다. 정상적으로 들어옵니다')
            return state
        case 'SAVECONTACT':
            return action.data // conatct를 저장하고 리턴
        default:
            return state
    }
}