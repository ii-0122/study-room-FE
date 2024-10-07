import { updateProfileFormData } from '@/types/updateProfile';
import { API_ROUTES } from './apiRoutes';
import axiosInstance from './axiosInstance.api';

export const updateProfile = async (data: updateProfileFormData) => {
  const response = await axiosInstance.patch(API_ROUTES.USER, data);
  return response.data;
};

export const deleteAccount = async () => {
  await axiosInstance.delete(API_ROUTES.USER);
};
