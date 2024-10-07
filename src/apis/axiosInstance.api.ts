import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { API_ROUTES } from './apiRoutes';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === API_ROUTES.LOGIN) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosInstance.post(
          API_ROUTES.REFRESH_TOKEN
        );
        const newAccessToken = refreshResponse.data.accessToken;
        const user = refreshResponse.data.user;

        const { setAuthData } = useAuthStore.getState();
        setAuthData(newAccessToken, user);
        Cookies.set('accessToken', newAccessToken, { expires: 1 });

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패', refreshError);
        const { clearAuthData } = useAuthStore.getState();
        clearAuthData();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
