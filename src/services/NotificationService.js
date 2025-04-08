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

      // 創建關閉按鈕
      const closeButton = document.createElement('button');
      const closeIcon = document.createElement('i');
      closeIcon.classList.add('pi', 'pi-times'); // 使用 'pi-times' 圖標
      closeButton.classList.add('close-btn');
      closeButton.appendChild(closeIcon);
      closeButton.addEventListener('click', () => {
          notificationElement.remove(); // 點擊後移除通知
      });
  
      notificationElement.appendChild(icon);
      notificationElement.appendChild(title);
      notificationElement.appendChild(messageElement);
      notificationElement.appendChild(closeButton);
  
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
  }
  
  export default NotificationService;
  