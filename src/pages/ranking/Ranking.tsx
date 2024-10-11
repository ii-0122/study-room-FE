import {
  RankingResponse,
  RankingType,
  RankingWithJWTResponse,
} from '@/types/ranking';
import RankingBoard from './components/RankingBoard';
import { useQuery } from '@tanstack/react-query';
import { getRankings, getRankingsWithJWT } from '@/apis/ranking.api';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import Loader from '@/components/loader/Loader';
import * as S from './Ranking.style';

export default function Ranking() {
  const rankingType: RankingType[] = ['day', 'week', 'month'];
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data, isPending } = useQuery<
    RankingResponse | RankingWithJWTResponse
  >({
    queryKey: ['getRankings', accessToken],
    queryFn: accessToken ? getRankingsWithJWT : getRankings,
  });

  return (
    <S.RankingContainer>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <S.BoardsArea>
            {rankingType.map((type: RankingType) => {
              const ranking = typeMapping[type];
              return (
                <RankingBoard
                  key={type}
                  rankingType={type}
                  rankingList={data ? data[ranking].top10 : []}
                  userInfo={
                    data && 'userInfo' in data[ranking]
                      ? data[ranking].userInfo
                      : undefined
                  }
                ></RankingBoard>
              );
            })}
          </S.BoardsArea>
          <S.Notice>
            ※ 순위 업데이트는 10분 정도의 오차가 발생할 수 있습니다.
          </S.Notice>
        </>
      )}
    </S.RankingContainer>
  );
}

const typeMapping: Record<RankingType, keyof RankingResponse> = {
  day: 'dayList',
  week: 'weekList',
  month: 'monthList',
};
