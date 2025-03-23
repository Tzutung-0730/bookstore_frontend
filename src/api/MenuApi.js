import { BASE_URL } from '../config/apiConfig';

export const MenuApi = {
    GetMenu: `${BASE_URL}/menu/GetMenu`,
    CreateMenu: `${BASE_URL}/menu/CreateMenu`,
    UpdateMenu: `${BASE_URL}/menu/UpdateMenu`,
    DeleteMenu: `${BASE_URL}/menu/DeleteMenu`,
};