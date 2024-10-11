import { API_ROUTES } from './apiRoutes';
import axiosInstance from './axiosInstance.api';

export const getRankings = async () => {
  try {
    const res = await axiosInstance.get(`${API_ROUTES.RANKINGS}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRankingsWithJWT = async () => {
  try {
    const res = await axiosInstance.get(`${API_ROUTES.RANKINGS}/jwt`);
    console.log(res);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
