import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { MenuApi } from '../../api/MenuApi';
import './Header.scss';

function Header({ isLoggedIn, role, onLogout }) {
  const [menu, setMenu] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制菜單開關
  const navigate = useNavigate();

  useEffect(() => {
    // 獲取菜單
    const storedMenu = localStorage.getItem('menu');
    if (storedMenu) {
      setMenu(JSON.parse(storedMenu));
    } else {
      ApiService.get(MenuApi.GetMenu, true)
        .then((res) => {
          setMenu(res);
          localStorage.setItem('menu', JSON.stringify(res));  // 儲存到 localStorage
        })
        .catch((err) => console.error('Menu fetch error:', err));
    }

    // 監聽點擊外部區域以關閉菜單
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.side-menu') && !event.target.closest('.hamburger-menu')) {
        setIsMenuOpen(false);  // 點擊外部時關閉菜單
      }
    };

    // 綁定事件
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]); // 每次菜單開關時都重新綁定事件

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);  // 切換菜單狀態
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // 點擊任意選單項目後關閉菜單
  };

  // 根據登入狀態過濾菜單
  const leftMenu = menu.filter(item => item.visible_for === 'all');
  const rightMenu = menu.filter(item => item.visible_for !== 'all' && 
    ((item.visible_for === 'guest' && !isLoggedIn) || 
     (item.visible_for === 'user' && isLoggedIn && role === 'user') || 
     (item.visible_for === 'admin' && isLoggedIn && role === 'admin'))
  );

  return (
    <header className="header-container">
      <nav className="nav-bar">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <i className="pi pi-bars"></i> {/* 漢堡菜單圖示 */}
        </div>

        {/* 側邊菜單 */}
        <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="side-nav-list">
            {/* 左側選單 */}
            {leftMenu.map((item) => (
              <li key={item.menu_id} className="left-menu" onClick={closeMenu}>
                <NavLink to={item.url} className="side-nav-link">
                  <i className={`pi ${item.icon}`}></i> {item.title}
                </NavLink>
              </li>
            ))}

            {/* 右側選單 */}
            {rightMenu.map((item) => (
              <li key={item.menu_id} className="right-menu" onClick={closeMenu}>
                {item.children && item.children.length > 0 ? (
                  <div className="dropdown">
                    <NavLink to={item.url} className="side-nav-link">
                      <i className={`pi ${item.icon}`}></i> {item.title}
                    </NavLink>
                    <ul className="dropdown-menu">
                      {item.children.map((child) => (
                        <li key={child.menu_id}>
                          <NavLink to={child.url} className="dropdown-item">
                            {child.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : item.url === '/logout' ? (
                  <button onClick={handleLogout} className="side-nav-link">
                    <i className={`pi ${item.icon}`}></i> {item.title}
                  </button>
                ) : (
                  <NavLink to={item.url} className="side-nav-link">
                    <i className={`pi ${item.icon}`}></i> {item.title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        <ul className={`nav-list ${isMenuOpen ? 'open' : ''}`}>
          {/* 左側選單 */}
          <div className="left-menu">
            {leftMenu.map((item) => (
              <li key={item.menu_id} className="nav-item">
                <NavLink to={item.url} className="nav-link">
                  <i className={`pi ${item.icon}`}></i> {item.title}
                </NavLink>
              </li>
            ))}
          </div>

          {/* 右側選單 */}
          <div className="right-menu">
            {rightMenu.map((item) => (
              <li key={item.menu_id} className="nav-item">
                {item.children && item.children.length > 0 ? (
                  <div className="dropdown">
                    <NavLink to={item.url} className="nav-link">
                      <i className={`pi ${item.icon}`}></i> {item.title}
                    </NavLink>
                    <ul className="dropdown-menu">
                      {item.children.map((child) => (
                        <li key={child.menu_id}>
                          <NavLink to={child.url} className="dropdown-item">
                            {child.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : item.url === '/logout' ? (
                  <button onClick={handleLogout} className="nav-link">
                    <i className={`pi ${item.icon}`}></i> {item.title}
                  </button>
                ) : (
                  <NavLink to={item.url} className="nav-link">
                    <i className={`pi ${item.icon}`}></i> {item.title}
                  </NavLink>
                )}
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
