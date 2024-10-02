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
  totalTime: number;
  // userId: string;
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
  isComplete: boolean;
  date: string;
  totalTime: number;
  // userId: string; // jwt에서 뽑아쓸수?
}

export interface CreatePlannerModel {
  date: string;
  todo: string;
}
export interface UpdatePlannerModel {
  plannerId: string;
  date: string;
  todo: string;
}

export interface ServerToClientPlanner {
  _id: string;
  date: string;
  todo: string;
  isComplete: boolean;
  totalTime: number;
}
