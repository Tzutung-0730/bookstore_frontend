import { BASE_URL } from '../config/apiConfig';

export const AuthApi = {
    Login: `${BASE_URL}/auth/Login`,
    Logout: `${BASE_URL}/auth/Logout`,
    Register: `${BASE_URL}/auth/Register`,
};