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
function App() {
  return (
    <Router>
      <div className = "App">
        <Routes>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
