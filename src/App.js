//컴포넌트 불러오는곳
import Main from './components/Main';
import Navs from './components/Navs';
import Notfound from './components/Notfound';
import Login from './components/Login';
import Signin from './components/Signin';

//redux를 사용해 상태관리
import { createStore } from 'redux'
import { Provider, useSelctor, UseDispatch, useDispatch } from 'react-redux'
import Dashboard from './components/Dashboard';
import Mksurvey from './components/Mksurvey';

import { BrowserRouter, Routes, Route } from 'react-router-dom'



//initialstate는 reducer의 기본값이 된다.
const initialstate = {
  value: 1,

  users: [
    {
      name: '백우진',
      id: 'bwj0509',
      password: 'abcd1234',
      email: 'bwj59@naevr.com',
    },
    {
      name: '김길동',
      id: 'gildong1234',
      password: 'hong12341',
      email: 'gildong12@gamil.com',
    },
  ]
}




//reducer함수를 사용해 action에 대해서 state를 관리한다
function reducer(state = initialstate, action) {
  switch (action.type) {
    case 'TEST':
      console.log('test들어옴!')
      console.log(action)
      return state
    case 'SIGNINUSER': // USER를 등록
      console.log('유저등록 완료!')
      const { id, password, name } = action.data
      return { ...state, users: [...state.users, { id: id, password: password, name: name }] }
    case 'CHECKID':
      const checkid = action.data
      //아이디 체크를 진행하는 조건식을 넣어주기
      alert(`${checkid}는 이미 사용중입니다. 다른 아이디를 사용해주세요.`)
      return state
    default:
      return { ...state }
  }
}

//createStore를 통해서 상태관리 변수 생성
const store = createStore(reducer);



function App() {

  return (
    <BrowserRouter>
      <Navs />
      <Routes>
        <Route path="/" element={<><Main /></>}></Route>
        <Route path="/signin" element={<><Signin /></>}></Route>
        <Route path="/login" element={<><Login /></>}></Route>
        {localStorage.getItem('email') //로그인된 여부에 따라 경로를 다르게 설정함
          ? <Route path='/dashboard' element={<><Dashboard /></>}></Route>
          : <Route path='/dashboard' element={<><Login /></>}></Route>
        }
        <Route path='/mksurvey' element={<><Mksurvey /></>}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;