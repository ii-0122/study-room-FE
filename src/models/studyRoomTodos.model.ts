export interface GetTodosRes {
  _id: string;
  subject: string;
  todo: string;
  startTime: string;
  endTime: string;
  timelineList: [
    {
      startTime: string;
      endTime: string;
    },
  ];
  repeatDays: string[];
  repeatWeeks: number;
  parentObjectId: string | undefined;
  isComplete: boolean;
  date: string;
  userId: string;
}

export interface PutPostTodoReq {
  subject?: string;
  todo: string;
  startTime?: string;
  endTime?: string;
  timelineList?: [
    {
      startTime: string;
      endTime: string;
    },
  ];
  repeatDays?: string[];
  repeatWeeks?: number;
  parentObjectId?: string | undefined;
  isComplete?: boolean;
  date: string;
  userId: string; // jwt에서 뽑아쓸수?
}
