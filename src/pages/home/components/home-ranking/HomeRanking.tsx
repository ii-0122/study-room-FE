import { RankingResponse, RankingWithJWTResponse } from '@/types/ranking';
import { getRankings, getRankingsWithJWT } from '@/apis/ranking.api';
import * as S from './HomeRanking.style';
import Loader from '@/components/loader/Loader';
import HomeRankingItem from './item/HomeRankingItem';
import { useQuery } from '@tanstack/react-query';

const HomeRanking = ({ isJWT }: { isJWT: boolean }) => {
  const { data, error, isLoading } = useQuery<
    RankingWithJWTResponse | RankingResponse,
    Error
  >({
    queryKey: ['data', isJWT],
    queryFn: isJWT ? getRankingsWithJWT : getRankings,
  });

  if (isLoading) {
    return (
      <S.HomeRankingStyle>
        <Loader />
      </S.HomeRankingStyle>
    );
  }

  if (error) {
    return <S.Text>랭킹 데이터를 불러오는 중 오류가 발생했습니다.</S.Text>;
  }

  return (
    <S.HomeRankingStyle>
      {data && <HomeRankingItem data={data} isJWT={isJWT} />}
    </S.HomeRankingStyle>
  );
};

export default HomeRanking;
