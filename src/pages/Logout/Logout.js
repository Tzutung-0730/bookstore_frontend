import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';  // 假設這裡有 API 呼叫服務
import { AuthApi } from '../../api/AuthApi';        // 假設這裡有 API 路徑配置

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 呼叫 API 登出
    ApiService.post(AuthApi.Logout, {}, true) // 假設 `true` 代表攜帶 `Authorization` 標頭中的 token
      .then((res) => {
        console.log('Logout successful:', res);

        // 清除 localStorage 中的 token 和 menu
        localStorage.removeItem('token');
        localStorage.removeItem('menu');
        console.log('logout', localStorage);

        // 呼叫父層的 onLogout 方法，更新登入狀態
        onLogout();

        // 跳轉回登入頁面
        navigate('/login');
      })
      .catch((err) => {
        console.error('Logout error:', err);
        // 在這裡可以顯示錯誤訊息給用戶
      });
  };

  return (
    <div className="logout-container">
      <h2>登出</h2>
      <button onClick={handleLogout}>登出</button>
    </div>
  );
}

export default Logout;
