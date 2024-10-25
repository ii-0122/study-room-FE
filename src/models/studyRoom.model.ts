import { ServerToClientPlanner } from './studyRoomTodos.model';

export interface StudyRoomInfo {
  title: string;
  notice: string;
  password?: string;
  tagList: string[];
  maxNum: number;
  isChat: boolean;
  isPublic: boolean;
  imageUrl: string;
  roomManager: string; // 닉네임
  currentMember: string[]; // ObjectId
  planner: ServerToClientPlanner[]; // 내 할 일 목록
  totalTime: number; // 나의 하루 총 공부시간
}

export interface ModifyRoomInfo {
  title: string;
  notice: string;
  password?: string;
  tagList: string[];
  maxNum: number;
  isChat: boolean;
  isPublic: boolean;
  imageUrl: string;
}

export interface ModifiedRoomInfo {
  title: string;
  notice: string;
  password?: string;
  tagList: string[];
  maxNum: number;
  isChat: boolean;
  isPublic: boolean;
  imageUrl: string;
  roomManager: string;
}

export interface OtherUserInfo {
  nickname: string;
  imageUrl: string;
  totalTime: number;
  timer: string;
  state: string; //'start' | 'stop';
}

export interface ClientToCServerTimer {
  timer: number;
  state: string; // 'start' | 'stop';
  socketId: string;
}

export interface ServerToClientTimer {
  nickname: string;
  imageUrl: string;
  timer: number;
  state: string; // 'start' | 'stop';
}

export interface TimerInfo {
  // 임시 작성
  nickname: string;
  imageUrl: string;
  totalTime: number;
  timer: string;
  state: string; // 'start' | 'stop';
}

export interface CurrentTodoTimer {
  totalTime: number;
  timer: string;
}

export interface TodoTimer {
  _id: string;
  totalTime: number;
}

export interface SubMember {
  nickname: string;
  roomManager: string;
}
