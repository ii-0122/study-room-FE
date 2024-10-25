import type { CreateStudyRoomFormData } from '@/types/createStudyRoom';
import axiosInstance from './axiosInstance.api';
import { FetchRoomsParams, Room, StudyItem } from '@/types/studyRoom';
import axios from 'axios';

// 방 생성 API 함수
export const createStudyRoom = async (data: CreateStudyRoomFormData) => {
  const response = await axiosInstance.post('/rooms', data);
  return response.data;
};

// 방 목록 요청 API 함수 - studyGrid.tsx
export const fetchRooms = async (
  params: FetchRoomsParams,
  pageParam: number
) => {
  const query = new URLSearchParams({
    search: params.search || '',
    isPublic: params.isPublic !== undefined ? String(params.isPublic) : '',
    isPossible:
      params.isPossible !== undefined ? String(params.isPossible) : '',
    limit: String(params.limit),
    offset: String(pageParam),
  }).toString();

  const { data: rooms }: { data: Room[] } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/rooms?${query}`
  );

  return {
    rooms,
    offset: rooms.length + pageParam,
    hasMore: rooms.length >= params.limit,
  };
};

// 방 비밀번호 확인 API 함수
export const checkStudyRoomPassword = async (
  roomId: string,
  password: string
) => {
  const response = await axiosInstance.post(`/rooms/checkPassword/${roomId}`, {
    password,
  });
  console.log(response.data);
  return response.data;
};

// 홈 조회 API 함수
export const homefetchRooms = async (limit: number): Promise<StudyItem[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/rooms?limit=${limit}`
  );

  if (response.status !== 200) {
    throw new Error('네트워크 응답이 좋지 않습니다.');
  }

  return response.data;
};
