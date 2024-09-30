import { useAuthStore } from '@/stores';
import axiosInstance from './axiosInstance.api';
import type { SignUpFormInputs } from '@/types/auth';
import { API_ROUTES } from './apiRoutes';

export const login = async (data: { id: string; password: string }) => {
  const response = await axiosInstance.post(API_ROUTES.LOGIN, data, {
    withCredentials: true,
  });

  const accessToken = response.data.access_token;
  const user = response.data.user;

  const { setAuthData } = useAuthStore.getState();
  if (accessToken) {
    setAuthData(accessToken, user);
  }
  return user;
};

export const logout = async () => {
  await axiosInstance.post(API_ROUTES.LOGOUT, {}, { withCredentials: true });

  const { clearAuthData } = useAuthStore.getState();
  clearAuthData();
};

export const signUp = async (data: SignUpFormInputs) => {
  const response = await axiosInstance.post(API_ROUTES.SIGNUP, data, {
    withCredentials: true,
  });
  return response.data;
};