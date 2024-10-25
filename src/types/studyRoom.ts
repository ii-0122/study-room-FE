export interface Room {
  _id: string;
  title: string;
  tagList: string[];
  notice?: string;
  maxNum: number;
  isPublic: boolean;
  password?: string;
  isChat?: boolean;
  imageUrl?: string;
  roomManager: string;
  currentMembers: string[];
  createdAt: string;
  currentNum: number;
}

export interface FetchRoomsParams {
  search?: string;
  isPublic?: boolean;
  isPossible?: boolean;
  limit: number;
  offset?: number;
}

export interface StudyItem {
  _id?: string;
  title: string;
  imageUrl?: string;
  tagList?: string[];
  isPublic: boolean;
  isChat?: boolean;
  maxNum: number;
  currentNum: number;
}
