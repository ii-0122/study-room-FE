import { useAuthStore } from '@/stores/auth.store';
import { API_ROUTES } from './apiRoutes';
import axiosInstance from './axiosInstance.api';
import Cookies from 'js-cookie';

export const refreshTokenAPI = async () => {
  try {
    const refreshResponse = await axiosInstance.post(API_ROUTES.REFRESH_TOKEN);
    const newAccessToken = refreshResponse.data.accessToken;
    const user = refreshResponse.data.user;
    const { setAuthData } = useAuthStore.getState();
    setAuthData(newAccessToken, user);
    Cookies.set('accessToken', newAccessToken, { expires: 1 });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
