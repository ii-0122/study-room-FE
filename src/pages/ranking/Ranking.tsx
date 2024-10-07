import { RankingResponse, RankingType } from '@/types/ranking';
import RankingBoard from './components/RankingBoard';
import * as S from './Ranking.style';

export default function Ranking() {
  const rankingType: RankingType[] = ['day', 'week', 'month'];

  return (
    <S.RankingContainer>
      <S.BoardsArea>
        {rankingType.map((type: RankingType) => {
          return (
            <RankingBoard
              key={type}
              rankingType={type}
              rankingList={TEMP_DATA[typeMapping[type]]}
              userInfo={TEMP_DATA.userInfo}
            ></RankingBoard>
          );
        })}
      </S.BoardsArea>
      <S.Notice>
        ※ 순위 업데이트는 10분 정도의 오차가 발생할 수 있습니다.
      </S.Notice>
    </S.RankingContainer>
  );
}

const TEMP_DATA: RankingResponse = {
  dayList: [
    {
      rank: 1,
      nickname: 'ㅡㅡㅡㅡㅡㅡㅡㅡ',
      studyTime: '12:34:56',
    },
    {
      rank: 2,
      nickname: 'myNickname',
      studyTime: '06:35:00',
    },
    {
      rank: 3,
      nickname: 'nickname1',
      studyTime: '05:34:56',
    },
    {
      rank: 4,
      nickname: 'myNickname',
      studyTime: '03:35:00',
    },
    {
      rank: 5,
      nickname: 'nickname1',
      studyTime: '12:34:56',
    },
    {
      rank: 6,
      nickname: 'myNickname',
      studyTime: '06:35:00',
    },
    {
      rank: 7,
      nickname: 'nickname1',
      studyTime: '05:34:56',
    },
    {
      rank: 8,
      nickname: 'myNickname',
      studyTime: '03:35:00',
    },
    {
      rank: 9,
      nickname: 'nickname1',
      studyTime: '12:34:56',
    },
    {
      rank: 10,
      nickname: 'myNickname',
      studyTime: '06:35:00',
    },
    {
      rank: 11,
      nickname: 'nickname1',
      studyTime: '05:34:56',
    },
    {
      rank: 12,
      nickname: 'myNickname',
      studyTime: '03:35:00',
    },
  ],
  weekList: [
    {
      rank: 1,
      nickname: 'nickname1',
      studyTime: '12:34:56',
    },
    {
      rank: 2,
      nickname: 'myNickname',
      studyTime: '06:35:00',
    },
  ],
  monthList: [
    {
      rank: 1,
      nickname: 'nickname1',
      studyTime: '12:34:56',
    },
    {
      rank: 2,
      nickname: 'myNickname',
      studyTime: '06:35:00',
    },
    {
      rank: 3,
      nickname: 'nickname1',
      studyTime: '05:34:56',
    },
    {
      rank: 4,
      nickname: 'myNickname',
      studyTime: '03:35:00',
    },
  ],
  userInfo: {
    rank: 30,
    nickname: '내닉네임',
    studyTime: '00:10:00',
  },
};

const typeMapping: Record<
  RankingType,
  keyof Omit<RankingResponse, 'userInfo'>
> = {
  day: 'dayList',
  week: 'weekList',
  month: 'monthList',
};
