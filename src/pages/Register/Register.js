import React, { useState, useRef, use } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService'; // 假設這裡有 API 呼叫服務
import { AuthApi } from '../../api/AuthApi';        // 假設這裡有 API 路徑配置
import NotificationService from '../../services/NotificationService';
import './Register.scss';

function Register() {
  const [username, setUsername] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const usernameInput = useRef(null);
  const emailInput = useRef(null);
  const accountInput = useRef(null);  // 用來引用帳號輸入框
  const passwordInput = useRef(null); // 用來引用密碼輸入框
  const confirmPasswordInput = useRef(null);  // 用來引用帳號輸入框
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username) {
      usernameInput.current.focus();
      return;
    }
    if (!account) {
      accountInput.current.focus();
      return;
    }
    if (!email) {
      emailInput.current.focus();
      return;
    }    
    if (!password) {
      passwordInput.current.focus();
      return;
    }
    if (password !== confirmPassword) {
      confirmPasswordInput.current.focus();
      setErrorMessage('密碼與確認密碼不一致');
      return;
    }

    const registerData = {
      account: account,
      password: password,
    };

    // 發送註冊請求
    ApiService.post(AuthApi.Register, registerData)
      .then((res) => {
        if (res.success) {
          // 註冊成功，重定向至登入頁面
          navigate('/login');
          NotificationService.showNotification('success', '註冊成功');
        } else {
          NotificationService.showNotification('error', '註冊失敗');
        }
      })
      .catch((err) => {
        NotificationService.showNotification('error', err.message);
      });
  };

  return (
    <div className="register-form">
      <div className="form-container">
        <h2>註冊</h2>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="請輸入使用者名稱"
            ref={usernameInput}
          />
          <i className="pi pi-users input-icon" />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="請輸入帳號"
            ref={accountInput}
          />
          <i className="pi pi-user input-icon" />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="請輸入E-mail"
            ref={emailInput}
          />
          <i className="pi pi-envelope input-icon" />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="請輸入密碼"
            ref={passwordInput}
          />
          <i className="pi pi-lock input-icon" />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="請再次輸入密碼"
            ref={confirmPasswordInput}
          />
          <i className="pi pi-shield input-icon" />
        </div>
        <button onClick={handleRegister}>註冊</button>
        <div className="links">
          <a href="/login">已經有帳號？點此登入</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
