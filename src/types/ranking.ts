export type RankingType = 'day' | 'week' | 'month';

export interface RankingList {
  rank: number;
  nickname: string;
  studyTime: string;
}

export interface RankingResponse {
  dayList: RankingList[];
  weekList: RankingList[];
  monthList: RankingList[];
  userInfo: RankingList;
}
