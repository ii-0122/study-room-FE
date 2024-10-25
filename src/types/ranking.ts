export type RankingType = 'day' | 'week' | 'month';

export interface UserInfo {
  nickname: string;
  totalTime: string;
  rank: number;
}

export interface RankingResponse {
  dayList: { top10: UserInfo[] };
  weekList: { top10: UserInfo[] };
  monthList: { top10: UserInfo[] };
}

export interface RankingWithJWTResponse {
  dayList: { top10: UserInfo[]; userInfo: UserInfo };
  weekList: { top10: UserInfo[]; userInfo: UserInfo };
  monthList: { top10: UserInfo[]; userInfo: UserInfo };
  prevPrevUserInfo: UserInfo;
  prevUserInfo: UserInfo;
  userInfo: UserInfo;
  nextUserInfo: UserInfo;
  nextNextUserInfo: UserInfo;
}
