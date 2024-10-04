import axiosInstance from './axiosInstance.api';
import type { SignUpFormInputs } from '@/types/auth';
import { API_ROUTES } from './apiRoutes';
import { useAuthStore } from '@/stores/auth.store';

export const login = async (data: { id: string; password: string }) => {
  const response = await axiosInstance.post(API_ROUTES.LOGIN, data);

  const accessToken = response.data.accessToken;
  const user = response.data.user;

  const { setAuthData } = useAuthStore.getState();
  if (accessToken) {
    setAuthData(accessToken, user);
  }
  return user;
};

export const logout = async () => {
  await axiosInstance.post(API_ROUTES.LOGOUT);

  const { clearAuthData } = useAuthStore.getState();
  clearAuthData();
};

export const signUp = async (data: SignUpFormInputs) => {
  const response = await axiosInstance.post(API_ROUTES.SIGNUP, data, {
    withCredentials: true,
  });
  return response.data;
};
