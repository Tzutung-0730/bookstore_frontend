import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import NotificationService from '../../services/NotificationService';
import { BooksApi } from '../../api/BooksApi'; 
import './BookDetails.scss';

const BookDetails = () => {
  const { isbn } = useParams();  // 從路由獲取 ISBN
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get(BooksApi.GetBookById(isbn), true)  // 獲取書籍詳情
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        NotificationService.showNotification('error', '無法獲取書籍詳情');
        setLoading(false);
      });
  }, [isbn]);

  if (loading) {
    return <div>加載中...</div>;
  }

  return (
    <div className="book-details-container">
      <h1>{book.title}</h1>
      <img src={book.cover_image} alt={book.title} className="book-image" />
      <p><strong>作者:</strong> {book.author}</p>
      <p><strong>出版社:</strong> {book.publisher}</p>
      <p><strong>出版日期:</strong> {book.publish_date}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>分類:</strong> {book.category}</p>
      <p><strong>價格:</strong> {book.price} 元</p>
      <p><strong>描述:</strong> {book.description}</p>
      <button className="btn-add-cart">加入購物車</button>
    </div>
  );
};

export default BookDetails;
