import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 清除 localStorage 中的 token
    localStorage.removeItem('token');
    // 呼叫父層的 onLogout 方法，更新登入狀態
    onLogout();
    // 跳轉回登入頁面
    navigate('/login');
  };

  return (
    <div className="logout-container">
      <h2>登出</h2>
      <button onClick={handleLogout}>登出</button>
    </div>
  );
}

export default Logout;
