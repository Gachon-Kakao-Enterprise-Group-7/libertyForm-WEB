const initialstate = {
  users: [
    {
      name: '백우진',
      phonenumber: '01050118246',
      id: 'bwj0509',
      password: 'abcd1234',
      email: 'bwj59@naevr.com',
      phone: '01050118246',
      survey: [
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
          surveyId: 9,
          title: 'DD시설 만족도 조사',
          question: 12,
          finish: false
        }
      ]
    },
    {
      name: '김길동',
      phonenumber: '01000000000',
      id: 'gildong1234',
      password: 'hong12341',
      email: 'gildong12@gamil.com',
      phone: '01012345678'
    },
  ]
}

export default function userReducer(state = initialstate, action) {
  switch (action.type) {
    case 'SIGNINUSER': // USER를 등록
      console.log('유저등록 완료!')
      const { id, password, email, name, phone } = action.data
      return { ...state, users: [...state.users, { id: id, password: password, email: email, name: name, phone: phone }] }
    case 'CHECKID':
      const checkid = action.data
      //아이디 체크를 진행하는 조건식을 넣어주기  
      alert(`${checkid}는 이미 사용중입니다. 다른 아이디를 사용해주세요.`)
      return state
    case 'LOGIN':
      console.log('로그인 들어옴')
      localStorage.setItem('id', action.data.id)
      localStorage.setItem('password', action.data.password)

      return state
    case 'LOGOUT':
      localStorage.clear()
      return state
    default:
      return { ...state }
  }
}