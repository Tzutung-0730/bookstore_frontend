import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApiService from './services/ApiService';  // 假設這裡有 API 呼叫服務
import NotificationService from './services/NotificationService'; // 假設這裡有通知服務
import { AuthApi } from './api/AuthApi';  
import { MenuApi } from './api/MenuApi';
import './App.scss';

import "primereact/resources/themes/lara-light-indigo/theme.css"; // 使用的主題
import "primereact/resources/primereact.min.css"; // 核心樣式
import "primeicons/primeicons.css"; // 圖示樣式

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Register from './pages/Register/Register';
import Books from './pages/Books/Books';
import BookDetails from './pages/BookDetails/BookDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(); // 預設角色是 guest
  const [menu, setMenu] = useState([]); // 菜單狀態

  useEffect(() => {
    // 檢查 localStorage 中是否有 menu
    const storedMenu = localStorage.getItem('menu');
    
    if (storedMenu) {
      setMenu(JSON.parse(storedMenu)); // 使用 localStorage 中的 menu 資料
      console.log("Menu fetched from localStorage:", storedMenu);
    } else {
      // 如果沒有，則從 API 獲取 menu
      ApiService.get(MenuApi.GetMenu, true)
        .then((res) => {
          setMenu(res);
          // 將獲取到的 menu 儲存在 localStorage 以便下次使用
          localStorage.setItem('menu', JSON.stringify(res));
          console.log("Menu fetched from API:", res);
        })
        .catch((err) => console.error('Menu fetch error:', err));
    }
    
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);  

  const handleLoginSuccess = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setIsLoggedIn(true);
    setRole(role); // 儲存角色，並傳遞給 Header
  };

  const handleLogout = () => {
    // 呼叫 API 登出
    ApiService.post(AuthApi.Logout, {}, true) 
      .then((res) => {
        console.log('Logout successful:', res);

        localStorage.removeItem('token');

        setIsLoggedIn(false);
        setRole('guest');
        
        NotificationService.showNotification('success', '登出成功');
      })
      .catch((err) => {
        console.error('Logout error:', err);
      });
  };

  return (
    <Router>
      <div className="App">
      {/* 傳遞 isLoggedIn, role 與 onLogout 給 Header */}
        <Header isLoggedIn={isLoggedIn} role={role} menu={menu} onLogout={handleLogout} />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:isbn" element={<BookDetails />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
