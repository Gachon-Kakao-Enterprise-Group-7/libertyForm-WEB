const initialstate = {
    value : 0
}

export default function testReducer(state=initialstate, action){
    switch(action.type){
        case 'TESTS':
            console.log('테스트가 정상적으로 들어옵니다!')
            return {...state, value: state.value +1}
        default:
            return state
    }
}