import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService'; 
import { AuthApi } from '../../api/AuthApi';  
import NotificationService from '../../services/NotificationService';
import Modal from '../../components/Modal/Modal';
import './Login.scss';

function Login({ onLoginSuccess }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showModal, setShowModal] = useState(false);
  const accountInput = useRef(null);  // 用來引用帳號輸入框
  const passwordInput = useRef(null); // 用來引用密碼輸入框
  const captchaInput = useRef(null);  // 用來引用圖形驗證碼輸入框
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!account) {
      accountInput.current.focus();
      return;
    }
    if (!password) {
      passwordInput.current.focus();
      return;
    }
    // if (!captcha) {
    //   captchaInput.current.focus();
    //   return;
    // }

    const loginData = {
      account: account,
      password: password,
      // captcha: captcha,
    };

    ApiService.post(AuthApi.Login, loginData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.user.role);
          
          // 更新父組件的 isLoggedIn 狀態
          onLoginSuccess(res.token, res.user.role); // 設置 isLoggedIn 為 true
          console.log(res.user.role);
          navigate('/'); // 登入成功後導航到主頁
          NotificationService.showNotification('success', '登入成功');
        } else {
          setPassword('');
          NotificationService.showNotification('error', '未輸入帳號或密碼');
        }
        console.log(res.data);
      })
      .catch((err) => {
        setPassword('');
        // setCaptcha('');       
        NotificationService.showNotification('error', err.data.error);
        setShowModal(true);  
      });
  };

  const handleModalClose = () => {
    setShowModal(false); // 關閉模態框
  };

  const handleConfirm = () => {
    // 當確認時，跳轉到註冊頁面
    navigate('/register');
    setShowModal(false); // 關閉模態框
  };

  return (
    <div className="login-form">
      <div className="form-container">
        <h2>會 員 登 入</h2>
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
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="請輸入密碼"
            ref={passwordInput}
          />
          <i className="pi pi-lock input-icon" />
        </div>
        <div className="links-up">
          <a href="/forgot-password">忘記密碼？</a>
        </div>
        <div className="form-group captcha">
          <input
            type="text"
            id="captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            placeholder="請輸入圖形驗證碼"
            ref={captchaInput}
          />
          <i className="pi pi-key input-icon" />
          {/* <img src="captcha-image.jpg" alt="Captcha" /> */}
        </div>
        <button onClick={handleLogin}>登入</button>
        <div className="links">
          <a href="/register">還沒有帳號？點此註冊</a>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title="確認操作"
        message="是否導向註冊頁面?"
        buttons={['confirm', 'cancel']}  // 傳遞需要顯示的按鈕
        onClose={handleModalClose}
        onButtonClick={handleConfirm}
      />
    </div>
  );
}

export default Login;
