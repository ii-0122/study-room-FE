import { PutPostTodoReq } from '@/models/studyRoomTodos.model';
import axios from 'axios';

/* 
작성자 : 이진성 
날짜 : 2024-09-21
목적 : PrivateStudyRoom.tsx에서 React-Query를 사용하기 위해서 만든,
JWT토큰이나 baseURL등 다른 설정들을 포함하지 않은
임시 api 입니다.
로그인 API, httpClient 설정이 되면 수정 예정입니다.
*/
export const getTodos = async (date: string) => {
  try {
    const res = await axios.get(`http://localhost:5555/planners?date=${date}`);
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
    await axios.post('http://localhost:5555/planners', req);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//planners/:plannerId(_id: ObjectId)
export const putTodo = async (data: PutPostTodoReq, _id: string) => {
  try {
    await axios.put(`http://localhost:5555/planners/${_id}`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
