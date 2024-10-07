export interface StartEndTime {
  startTime: { date: string; time: string };
  endTime: { date: string; time: string };
}
export interface GetTodosRes {
  _id: string;
  todo: string;
  date: string;
  subject: string; // default = ''
  startTime: string; // 계획 - 시작시간 , default = ''
  endTime: string; // 계획 - 종료시간, default = ''
  repeatDays: string[]; // default = []
  repeatWeeks: number; // default = 1
  parentObjectId?: string | undefined;
  isComplete?: boolean;
  timelineList?: StartEndTime[] | undefined;
  totalTime: number;
  repeatEndDate: string;
  // userId: string;
}

export interface PutPostTodoReq {
  _id?: string;
  todo: string;
  date: string;
  subject?: string;
  startTime?: string;
  endTime?: string;
  repeatDays?: string[];
  // repeatWeeks?: number;
  repeatEndDate?: string;
  parentObjectId?: string | undefined;
  isComplete?: boolean;
  // timelineList?: StartEndTime[] | undefined;
  // totalTime?: number;
}
