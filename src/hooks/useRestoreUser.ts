import { useEffect } from 'react';
import axiosInstance from '@/apis/axiosInstance.api';
import { useAuthStore } from '@/stores/auth.store';
import { API_ROUTES } from '@/apis/apiRoutes';

export const useRestoreUser = () => {
  const { setAuthData, clearAuthData } = useAuthStore();

  const restoreUser = async () => {
    try {
      const response = await axiosInstance.post(API_ROUTES.REFRESH_TOKEN);
      const newAccessToken = response.data.accessToken;
      const user = response.data.user;

      setAuthData(newAccessToken, user);
    } catch (error) {
      console.error('유저 정보를 복원할 수 없습니다.', error);

      clearAuthData();
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);
};
