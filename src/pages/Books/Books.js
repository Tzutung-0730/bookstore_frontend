import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import NotificationService from '../../services/NotificationService';
import { BooksApi } from '../../api/BooksApi'; 
import './Books.scss';

const Books = () => {
  const [books, setBooks] = useState([]);  // 用來存儲書籍資料
  const [currentPage, setCurrentPage] = useState(1);  // 當前頁碼
  const [totalPages, setTotalPages] = useState(1);  // 總頁數
  const [loading, setLoading] = useState(true);  // 加載狀態
  const [favorites, setFavorites] = useState([]); // 用來存儲收藏的書籍ID

  // API 請求，獲取書籍資料
  const fetchBooks = (page = 1) => {
    setLoading(true);
    console.log("Fetching books for page:", page);
    ApiService.get(`${BooksApi.GetBooks}?page=${page}`)
      .then((response) => {
        console.log("Fetching page:", page);
        setBooks(response.data);  // 存儲書籍資料
        console.log("Books data:", response.data);
        setTotalPages(response.last_page);  // 總頁數
        setCurrentPage(page);  // 更新當前頁碼
        setLoading(false);
      })
      .catch((error) => {
        NotificationService.showNotification('error', '無法獲取書籍資料');
        setLoading(false);
      });
  };

  // 初始載入
  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  // 處理分頁
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // 確保頁碼在有效範圍內
    setCurrentPage(page);
  };

  // // 切換收藏狀態
  // const handleFavorite = (bookId) => {
  //   setFavorites(prevFavorites => {
  //     if (prevFavorites.includes(bookId)) {
  //       // 如果已經收藏，則取消收藏
  //       return prevFavorites.filter(id => id !== bookId);
  //     } else {
  //       // 如果沒收藏，則加入收藏
  //       return [...prevFavorites, bookId];
  //     }
  //   });
  // };

  return (
    <div className="books-container">
      <h1>書籍列表</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.book_id} className="book-item">
            <div className="book-image-container">
              <img src={book.cover_image} alt={book.title} className="book-cover" />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p><strong>作者：</strong>{book.author}</p>
              <p><strong>出版日期：</strong>{new Date(book.publish_date).toLocaleDateString()}</p>
              <p><strong>價格：</strong>NT$ {book.price}</p>
              <p><strong>庫存：</strong>{book.stock}</p>
              <p><strong>描述：</strong>{book.description}</p>
              <div className="book-actions">
                <button className="info-btn">更多資訊</button>
                <button className="add-cart-btn">加入購物車</button>
              </div>
            </div>
            {/* <div 
              className={`favorite-icon ${favorites.includes(book.book_id) ? 'active' : ''}`} 
              onClick={() => handleFavorite(book.book_id)}
            >
              ❤️
            </div> */}
          </div>
        ))}
      </div>

      {/* 分頁區塊 */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &laquo; 上一頁
        </button>
        <span>頁 {currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          下一頁 &raquo;
        </button>
      </div>
      <h1>..</h1>
    </div>
  );
};

export default Books;
