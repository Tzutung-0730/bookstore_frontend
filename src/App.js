import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import 'primeicons/primeicons.css'; 

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Register from './pages/Register/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(); // 預設角色是 guest

  const handleLoginSuccess = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setIsLoggedIn(true);
    setRole(role); // 儲存角色，並傳遞給 Header
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');  // 清除 role
    setIsLoggedIn(false);
    setToken(null);  // 清除 token
    setRole(null);  // 清除 role
  };

  // 頁面載入時，檢查 localStorage 中的 token 和 role
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []); 

  return (
    <Router>
      <div className="App">
      {/* 傳遞 isLoggedIn, role 與 onLogout 給 Header */}
        <Header isLoggedIn={isLoggedIn} role={role} onLogout={handleLogout} />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
