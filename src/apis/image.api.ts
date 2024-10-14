import { API_ROUTES } from './apiRoutes';
import axiosInstance from './axiosInstance.api';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosInstance.post(API_ROUTES.IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error('이미지 업로드 실패', error);
    throw error;
  }
};

export const updateImage = async (file: File, existingImageUrl: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('imageUrl', existingImageUrl);

  try {
    const response = await axiosInstance.put(API_ROUTES.IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error('이미지 업데이트 실패', error);
    throw error;
  }
};

export const deleteImage = async (existingImageUrl: string) => {
  try {
    const response = await axiosInstance.delete(API_ROUTES.IMAGE, {
      data: { imageUrl: existingImageUrl },
    });
    return response.data;
  } catch (error) {
    console.error('이미지 삭제 실패', error);
    throw error;
  }
};
