import { RankingType, UserInfo } from '@/types/ranking';
import * as S from './RankingBoard.style';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';

interface RankingBoardProps {
  rankingType: RankingType;
  rankingList: UserInfo[];
  userInfo: UserInfo | undefined;
}

export default function RankingBoard({
  rankingType,
  rankingList,
  userInfo,
}: RankingBoardProps) {
  const processedRankingList: UserInfo[] =
    rankingList.length > 10
      ? rankingList.slice(0, 10)
      : [...rankingList, ...Array(10 - rankingList.length).fill({})];

  const [myIndex, setMyIndex] = useState<number | null>(null);

  useEffect(() => {
    rankingList.forEach((rankInfo, index) => {
      if (rankInfo.nickname === userInfo?.nickname) {
        setMyIndex(index);
      }
    });
  }, [rankingList, userInfo]);

  return (
    <S.BoardContainer>
      <S.BoardAndInformWrapper>
        <S.InformText>{informText[rankingType]}</S.InformText>
        <S.BoardWrapper bgColor={bgColor[rankingType]}>
          <S.Title>{title[rankingType]}</S.Title>
          <S.ContentWrapper gridCellCount={userInfo ? 10 : 9}>
            {['순위', '닉네임', '공부 시간'].map((header, index) => {
              return (
                <S.GridItem className="header" key={index}>
                  {header}
                </S.GridItem>
              );
            })}
            {processedRankingList.map((rankInfo, index) => {
              const isMine = myIndex === index;
              return (
                <Fragment key={index}>
                  {rankInfo.rank < 4 ? (
                    <S.GridItem isMine={isMine}>
                      <S.CrownWrapper>
                        <S.CrownText>{rankInfo.rank}</S.CrownText>
                        <S.CrownIcon rank={rankInfo.rank} />
                      </S.CrownWrapper>
                    </S.GridItem>
                  ) : (
                    <S.GridItem isMine={isMine}>{rankInfo.rank}</S.GridItem>
                  )}
                  <S.GridItem isMine={isMine}>{rankInfo.nickname}</S.GridItem>
                  <S.GridItem isMine={isMine}>{rankInfo.totalTime}</S.GridItem>
                </Fragment>
              );
            })}
            {userInfo ? (
              <>
                <S.UserInfoGrid>
                  {userInfo.totalTime !== '00:00:00' ? userInfo.rank : '-'}
                </S.UserInfoGrid>
                <S.UserInfoGrid>{userInfo.nickname}</S.UserInfoGrid>
                <S.UserInfoGrid>{userInfo.totalTime}</S.UserInfoGrid>
              </>
            ) : (
              <></>
            )}
          </S.ContentWrapper>
        </S.BoardWrapper>
      </S.BoardAndInformWrapper>
    </S.BoardContainer>
  );
}

const informText = {
  day: '※ 일일 순위는 매일 자정에 초기화됩니다.',
  week: '※ 주간 순위는 매주 월요일에 초기화됩니다.',
  month: '※ 월간 순위는 매달 1일에 초기화됩니다.',
};

const bgColor = {
  day: 'rgb(255,223,223)',
  week: 'rgb(255,230,207)',
  month: 'rgb(243,255,223)',
};

const title = {
  day: '일일 순위',
  week: '주간 순위',
  month: '월간 순위',
};
