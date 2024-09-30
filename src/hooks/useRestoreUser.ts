import { useEffect } from 'react';
import axiosInstance from '@/apis/axiosInstance.api';
import { useAuthStore } from '@/stores/auth.store';
import { API_ROUTES } from '@/apis/apiRoutes';
import Cookies from 'js-cookie';

export const useRestoreUser = () => {
  const { setAuthData, clearAuthData } = useAuthStore();

  const restoreUser = async () => {
    const tokenFromCookie = Cookies.get('accessToken');

    if (!tokenFromCookie) {
      clearAuthData();
      return;
    }

    try {
      const response = await axiosInstance.get(API_ROUTES.ME, {
        headers: {
          Authorization: `Bearer ${tokenFromCookie}`,
        },
        withCredentials: true,
      });

      const user = response.data.user;
      setAuthData(tokenFromCookie, user);
    } catch (error) {
      console.error('유저 정보를 복원할 수 없습니다:', error);
      clearAuthData();
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);
};
