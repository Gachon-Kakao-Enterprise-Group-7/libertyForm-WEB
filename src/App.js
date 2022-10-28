//컴포넌트 불러오는곳
import Main from './components/Main';
import Navs from './components/Navs';
import Notfound from './components/Notfound';
import Login from './components/Login';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import Mksurvey from './components/Mksurvey';
import Kakaologin from './components/Kakaologin';



import { BrowserRouter, Routes, Route } from 'react-router-dom' // 리액트 라우터 기능 사용
import Dashboard_g from './components/dashboard/Dashboard_g';
import Dcontent from './components/dashboard/Home/Content';


function App() {

  return (
    <BrowserRouter>
      <Navs />
      <Routes>
        <Route path="/" element={<><Main /></>}></Route>
        <Route path="/signin" element={<><Signin /></>}></Route>
        <Route path="/login" element={<><Login /></>}></Route>
        <Route path="/dashboard_g" element={<><Dashboard_g /></>}></Route>
        <Route path='/dcontent' element={<><Dcontent /></>}></Route>
        <Route path="/kakaologin" element={<><Kakaologin /></>}></Route>
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