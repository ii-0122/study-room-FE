import { PutPostTodoReq } from '@/models/studyRoomTodos.model';
import axiosInstance from './axiosInstance.api';
import { API_ROUTES } from './apiRoutes';

export const getTodos = async (date: string) => {
  try {
    console.log('get실행');
    const res = await axiosInstance.get(`${API_ROUTES.PLANNERS}?date=${date}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postTodo = async (data: PutPostTodoReq, date: string) => {
  try {
    const req = { ...data, date };
    console.log('post실행');
    await axiosInstance.post(`${API_ROUTES.PLANNERS}`, req);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putTodo = async (data: PutPostTodoReq, plannerId: string) => {
  try {
    console.log('put 실행');
    console.log(`url ${plannerId}`);
    console.log(data);

    await axiosInstance.put(`${API_ROUTES.PLANNERS}/${plannerId}`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTodo = async (plannerId: string) => {
  try {
    await axiosInstance.delete(`${API_ROUTES.PLANNERS}/${plannerId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const patchCheckBox = async (plannerId: string) => {
  try {
    await axiosInstance.patch(`${API_ROUTES.PLANNERS}/completed/${plannerId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStatistics = async (
  year: number,
  month: number,
  day: number
) => {
  try {
    const res = await axiosInstance.get(
      `${API_ROUTES.STATISTICS}/my/daily?year=${year}&month=${month}&day=${day}`
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
