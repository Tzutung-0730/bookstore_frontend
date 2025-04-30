import { BASE_URL } from '../config/apiConfig';

export const BooksApi = {
    GetBooks: `${BASE_URL}/books/GetBooks`,
    GetBookById: `${BASE_URL}/books/GetBookById`,
};