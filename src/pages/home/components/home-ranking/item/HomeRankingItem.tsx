import { RankingResponse, RankingWithJWTResponse } from '@/types/ranking';
import * as S from './HomeRankingItem.style';
import { useAuthStore } from '@/stores/auth.store';

interface RankingItemProps {
  data: RankingWithJWTResponse | RankingResponse;
  isJWT?: boolean;
}

const RankDisplay = ({
  rank,
  nickname,
  totalTime,
  isDayList,
}: {
  rank: number | undefined;
  nickname: string | undefined;
  totalTime: string | undefined;
  isDayList?: boolean;
}) => {
  const { user } = useAuthStore();
  const isCurrentUser = user?.nickname === nickname;

  const renderRank = () => {
    if (rank === 1) {
      return <img src="1_medal.png" alt="1st" />;
    } else if (rank === 2) {
      return <img src="2_medal.png" alt="2nd" />;
    } else if (rank === 3) {
      return <img src="3_medal.png" alt="3rd" />;
    } else {
      return rank;
    }
  };

  return (
    <S.RankItem isCurrentUser={isCurrentUser}>
      <S.Rank isDayList={isDayList}>{renderRank()}</S.Rank>
      <S.ItemWrap>
        <S.NickName>{nickname}</S.NickName>
        <S.TotalTime>{totalTime}</S.TotalTime>
      </S.ItemWrap>
    </S.RankItem>
  );
};

function HomeRankingItem({ data, isJWT }: RankingItemProps) {
  const myListItems = [];

  if (isJWT && 'userInfo' in data) {
    const {
      userInfo,
      prevPrevUserInfo,
      prevUserInfo,
      nextUserInfo,
      nextNextUserInfo,
    } = data;

    // userInfo.rank에 따라 myListItems에 추가
    if (userInfo.rank === 1) {
      myListItems.push(userInfo);
      if (nextUserInfo && Object.keys(nextUserInfo).length > 0)
        myListItems.push(nextUserInfo);
      if (nextNextUserInfo && Object.keys(nextNextUserInfo).length > 0)
        myListItems.push(nextNextUserInfo);
    }
    // prevPrevUserInfo, prevUserInfo 있지만 nextUserInfo nextNextUserInfo는 없는 경우
    else if (
      Object.keys(prevPrevUserInfo).length > 0 &&
      Object.keys(prevUserInfo).length > 0 &&
      Object.keys(nextUserInfo).length === 0 &&
      Object.keys(nextNextUserInfo).length === 0
    ) {
      myListItems.push(prevPrevUserInfo);
      myListItems.push(prevUserInfo);
      myListItems.push(userInfo);
    }
    // nextUserInfo가 있을 경우
    else if (prevUserInfo) {
      myListItems.push(prevUserInfo);
      myListItems.push(userInfo);
      if (nextUserInfo && Object.keys(nextUserInfo).length > 0)
        myListItems.push(nextUserInfo);
    }
  }

  const top10 = data?.dayList?.top10 || [];

  return (
    <S.RankingItemStyle>
      <S.Wrap>
        <S.Title>{isJWT ? 'Top 3' : 'Top 10'}</S.Title>
        <S.List isTop10={!isJWT}>
          {isJWT ? (
            top10.length > 0 ? (
              top10
                .slice(0, 3)
                .map((item, index) => (
                  <RankDisplay
                    key={index}
                    rank={item.rank}
                    nickname={item.nickname}
                    totalTime={item.totalTime}
                    isDayList={true}
                  />
                ))
            ) : (
              <S.NoUserMessage>오늘의 랭킹이 없습니다.</S.NoUserMessage>
            )
          ) : top10.length > 0 ? (
            top10.map((item, index) => (
              <RankDisplay
                key={index}
                rank={item.rank}
                nickname={item.nickname}
                totalTime={item.totalTime}
                isDayList={true}
              />
            ))
          ) : (
            <S.NoUserMessage>오늘의 랭킹이 없습니다.</S.NoUserMessage>
          )}
        </S.List>
      </S.Wrap>
      {isJWT && (
        <S.Wrap>
          <S.Title>내 순위</S.Title>
          <S.List>
            {myListItems.map((item, index) => (
              <RankDisplay
                key={index}
                rank={item.rank}
                nickname={item.nickname}
                totalTime={item.totalTime}
                isDayList={false}
              />
            ))}
          </S.List>
        </S.Wrap>
      )}
    </S.RankingItemStyle>
  );
}

export default HomeRankingItem;
