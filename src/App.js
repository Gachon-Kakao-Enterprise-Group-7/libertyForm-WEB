import React, { useEffect } from 'react';
import Main from './components/Main';
import Navs from './components/Navs';
import Notfound from './components/Notfound';

//redux를 사용해 상태관리
import { craeteStore, createStore } from 'redux'
import { Provider, useSelctor, UseDispatch, useDispatch } from 'react-redux'
import Signin from './components/Signin';

import { BrowserRouter, Routes, Route } from 'react-router-dom'



//initialstate는 reducer의 기본값이 된다.
const initialstate = {
  value: 1,

  users: [
    {
      id: 'bwj0509',
      password: 'abcd1234',
      email: 'bwj59@naevr.com'
    },
    {
      id: 'gildong1234',
      password: 'hong12341',
      email: 'gildong12@gamil.com'
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
      const { id, password, email } = action.data
      return { ...state, users: [...state.users, { id: id, password: password, email: email }] }
    default:
      return { ...state }
  }
}

//createStore를 통해서 상태관리 변수 생성
const store = createStore(reducer);



function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Navs /><Main /></>}></Route>
          <Route path="/signin" element={<><Navs /><Signin /></>}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;