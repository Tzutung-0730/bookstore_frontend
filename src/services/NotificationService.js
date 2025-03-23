class NotificationService {
    static showNotification(type, message) {
      const notificationElement = document.createElement('div');
      notificationElement.classList.add('notification-popup', type);
  
      // 根據類型顯示不同的圖示
      const icon = document.createElement('i');
      if (type === 'success') {
        icon.classList.add('pi', 'pi-check-circle'); // 成功圖示
      } else if (type === 'warn') {
        icon.classList.add('pi', 'pi-exclamation-triangle'); // 警告圖示
      } else if (type === 'error') {
        icon.classList.add('pi', 'pi-times-circle'); // 錯誤圖示
      }
  
      const title = document.createElement('strong');
      title.textContent = '訊息通知'; // 設定標題
  
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.classList.add('message');
  
      notificationElement.appendChild(icon);
      notificationElement.appendChild(title);
      notificationElement.appendChild(messageElement);
  
      // 設定通知框的樣式
    //   notificationElement.style.position = 'fixed';
    //   notificationElement.style.top = '20px';
    //   notificationElement.style.right = '20px';
    //   notificationElement.style.padding = '15px 25px';
    //   notificationElement.style.borderRadius = '8px';
    //   notificationElement.style.zIndex = '9999';
    //   notificationElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    //   notificationElement.style.transition = 'opacity 0.3s ease';
    //   notificationElement.style.maxWidth = '400px'; // 設定最大寬度
    //   notificationElement.style.wordWrap = 'break-word';  // 文字換行
    //   notificationElement.style.whiteSpace = 'normal'; // 設置文字為正常換行
  
      // 顯示通知框
      document.body.appendChild(notificationElement);
  
      // 自動隱藏通知框
      setTimeout(() => {
        notificationElement.style.opacity = '0'; // 讓通知框逐漸隱藏
        setTimeout(() => {
          notificationElement.remove(); // 5秒後移除通知框
        }, 300);
      }, 5000);
    }
  
    // 根據通知類型返回不同的背景顏色
    static getBackgroundColor(type) {
      switch (type) {
        case 'success':
          return '#4CAF50'; // 成功 - 綠色
        case 'warn':
          return '#FF9800'; // 警告 - 黃色
        case 'error':
          return '#f44336'; // 錯誤 - 紅色
        default:
          return '#4CAF50'; // 默認為綠色
      }
    }
  }
  
  export default NotificationService;
  