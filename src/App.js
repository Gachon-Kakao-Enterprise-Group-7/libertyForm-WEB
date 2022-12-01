//컴포넌트 불러오는곳

import Main from './components/common/Main';
import Navs from './components/common/Navs';
import Notfound from './components/common/Notfound';
import Login from './components/user/Login';
import Signin from './components/user/Signin';
import Kakaologin from './components/user/Kakaologin';
import Frame from './components/common/Frame';
import Dosurvey from './components/dosurvey/Dosurvey';
import Surveyend from './components/dosurvey/Surveyend'
import Adminpage from './components/common/Adminpage';
import Onboarding from './components/onboarding/Onboarding';

import { GlobalStyle } from './globalstyle'

import { BrowserRouter, Routes, Route } from 'react-router-dom' // 리액트 라우터 기능 사용
import { AnimatePresence } from "framer-motion"; //애니메이션 라이브러리
import AlreadyAnswered from 'components/dosurvey/AlreadyAnswered';


function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navs />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<><Main /></>}></Route>
          <Route path="/home/*" element={<Frame></Frame>} />
          <Route path="/signin" element={<><Signin /></>}></Route>
          <Route path="/login" element={<><Login /></>}></Route>
          <Route path="/kakaologin" element={<><Kakaologin /></>}></Route>
          <Route path="/dosurvey/:surveyCode" element={<Dosurvey />}></Route>
          <Route path="/doprivatesurvey/:privateSurveyCode" element={<Dosurvey />}></Route>
          <Route path="/alreadyanswered" element={<AlreadyAnswered />}></Route>
          <Route path="/surveyend" element={<Surveyend />}></Route>
          <Route path="/adminpage" element={<Adminpage />}></Route>
          <Route path="/onboarding" element={<Onboarding />}></Route>
          <Route path="*" element={<Notfound />}></Route>
          {/* 예외처리로 Notfound페이지 이동시킨다. */}
        </Routes>
      </AnimatePresence>
      <GlobalStyle />
    </BrowserRouter>

  );
}

export default App;