import type { CreateStudyRoomFormData } from '@/types/createStudyRoom';
import axiosInstance from './axiosInstance.api';

export const createStudyRoom = async (data: CreateStudyRoomFormData) => {
  try {
    const response = await axiosInstance.post('/rooms', data);
    return response.data;
  } catch (error) {
    console.error('공부방 생성 실패:', error);
    throw error;
  }
};
