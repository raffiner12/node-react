import React from 'react';
import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Link  // eslint-disable-line no-unused-vars 
        // (주석 달아주니 해결됨.. -> jsx로 처리되는 변수들은 shadowing 돼서 eslint가 찾아내지 못한다.)
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import auth from './hoc/auth';

function App() {
  return (
    // <p>
    //   오류 해결해주세요.
    // </p>
    <Router>  
      <div>
        <Routes>  
          <Route exact path="/" element={Auth(LandingPage, null) } />
          <Route exact path="/login" element={Auth(LoginPage, false)} />
          <Route exact path="/register" element={Auth(RegisterPage, false)} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
