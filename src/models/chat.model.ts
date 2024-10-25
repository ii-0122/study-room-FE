export interface ChatReq {
  nickname: string;
  message: string;
}

export interface ChatRes {
  nickname: string;
  message: string;
  imageUrl: string;
  time: string;
}
