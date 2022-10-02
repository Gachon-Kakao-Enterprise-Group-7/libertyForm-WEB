const initialstate =  {
    users: [
        {
          name: '백우진',
          phonenumber: '01050118246',
          id: 'bwj0509',
          password: 'abcd1234',
          email: 'bwj59@naevr.com',
          phone:'01050118246'
        },
        {
          name: '김길동',
          phonenumber: '01000000000',
          id: 'gildong1234',
          password: 'hong12341',
          email: 'gildong12@gamil.com',
          phone:'01012345678'
        },
      ]
}

export default function userReducer(state = initialstate, action){
    switch (action.type) {
        case 'SIGNINUSER': // USER를 등록
          console.log('유저등록 완료!')
          const { id, password, email, name, phone } = action.data
          return { ...state, users: [...state.users, { id: id, password: password, email: email, name:name, phone:phone }] }
        case 'CHECKID':
          const checkid = action.data
          //아이디 체크를 진행하는 조건식을 넣어주기  
          alert(`${checkid}는 이미 사용중입니다. 다른 아이디를 사용해주세요.`)
          return state
        case 'LOGIN':
          console.log('로그인 들어옴')
          localStorage.setItem('id',action.data.id)
          localStorage.setItem('password',action.data.password)
          
          return state
        case 'LOGOUT':
          localStorage.clear()
          return state
        default:
          return { ...state }
      }
}