//컴포넌트 불러오는곳
import Main from './components/Main';
import Navs from './components/Navs';
import Notfound from './components/Notfound';
import Login from './components/Login';
import Signin from './components/Signin';
import Dashboard_prev from './components/Dashboard_prev';
import Mksurvey from './components/Mksurvey';
import Kakaologin from './components/Kakaologin';
import Dashboard from './components/dashboard/Dashboard';
import Dcontent from './components/dashboard/Home/Content';
import Dosurvey from './components/Dosurvey';
import Surveyend from './components/Surveyend';
import Surveysend from './components/Surveysend';
import Adminpage from './components/Adminpage';

import { GlobalStyle } from './components/GlobalStyle'


import { BrowserRouter, Routes, Route } from 'react-router-dom' // 리액트 라우터 기능 사용
import { AnimatePresence } from "framer-motion"; //애니메이션 라이브러리




function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navs />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<><Main /></>}></Route>
          <Route path="/signin" element={<><Signin /></>}></Route>
          <Route path="/login" element={<><Login /></>}></Route>
          <Route path="/dashboard_prev" element={<><Dashboard_prev /></>}></Route>
          {/* dashboard_prev 임시로 사용 가능! */}
          <Route path="/kakaologin" element={<><Kakaologin /></>}></Route>
          {localStorage.getItem('email') //로그인된 여부에 따라 경로를 다르게 설정함
            ? <Route path='/dashboard' element={<><Dashboard /></>}></Route>
            : <Route path='/dashboard' element={<><Login /></>}></Route>
          }
          <Route path='/mksurvey' element={<><Dcontent /></>}></Route>
          <Route path='/mksurvey_prev' element={<><Mksurvey /></>}></Route>
          {/* mksurvey_prev 임시로 사용 가능! */}

          <Route path="/dosurvey/:surveyCode" element={<Dosurvey />}></Route>
          <Route path="/surveysend" element={<Surveysend />}></Route>
          <Route path="/surveyend" element={<Surveyend />}></Route>
          <Route path="/adminpage" element={<Adminpage />}></Route>
          
          <Route path="*" element={<Notfound />}></Route>
          {/* 예외처리로 Notfound페이지 이동시킨다. */}
        </Routes>
      </AnimatePresence>
      <GlobalStyle />
    </BrowserRouter>

  );
}

export default App;