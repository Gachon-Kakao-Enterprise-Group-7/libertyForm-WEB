
import Main from './components/Main';
import Navs from './components/Navs';
import Notfound from './components/Notfound';
import Login from './components/Login';
import Signin from './components/Signin';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useSelector } from 'react-redux'



function App() {
  
  const state = useSelector(state => state)
  console.log(state)

  return (
    <BrowserRouter>
      <Navs /> 
        <Routes>
          <Route path="/" element={<><Main /></>}></Route>
          <Route path="/signin" element={<><Signin /></>}></Route>
          <Route path="/login" element={<><Login /></>}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>

  );
}

export default App;