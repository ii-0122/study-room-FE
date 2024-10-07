import type { CreateStudyRoomFormData } from '@/types/createStudyRoom';
import axiosInstance from './axiosInstance.api';

export const createStudyRoom = async (data: CreateStudyRoomFormData) => {
  const response = await axiosInstance.post('/rooms', data);
  return response.data;
};
