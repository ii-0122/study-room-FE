import { RankingList, RankingType } from '@/types/ranking';
import * as S from './RankingBoard.style';
import { Fragment } from 'react/jsx-runtime';

interface RankingBoardProps {
  rankingType: RankingType;
  rankingList: RankingList[];
  userInfo: RankingList;
}

export default function RankingBoard({
  rankingType,
  rankingList,
  userInfo,
}: RankingBoardProps) {
  const processedRankingList: RankingList[] =
    rankingList.length > 10
      ? rankingList.slice(0, 10)
      : [...rankingList, ...Array(10 - rankingList.length).fill({})];

  return (
    <S.BoardContainer>
      <S.BoardAndInformWrapper>
        <S.InformText>{informText[rankingType]}</S.InformText>
        <S.BoardWrapper bgColor={bgColor[rankingType]}>
          <S.Title>{title[rankingType]}</S.Title>
          <S.ContentWrapper>
            {['순위', '닉네임', '공부 시간'].map((header, index) => {
              return (
                <S.GridItem className="header" key={index}>
                  {header}
                </S.GridItem>
              );
            })}
            {processedRankingList.map((rankInfo, index) => {
              return (
                <Fragment key={index}>
                  {rankInfo.rank < 4 ? (
                    <S.GridItem>
                      <S.CrownWrapper>
                        <S.CrownText>{rankInfo.rank}</S.CrownText>
                        <S.CrownIcon rank={rankInfo.rank} />
                      </S.CrownWrapper>
                    </S.GridItem>
                  ) : (
                    <S.GridItem>{rankInfo.rank}</S.GridItem>
                  )}
                  <S.GridItem>{rankInfo.nickname}</S.GridItem>
                  <S.GridItem>{rankInfo.studyTime}</S.GridItem>
                </Fragment>
              );
            })}
            <S.GridItem className="myRank">{userInfo.rank}</S.GridItem>
            <S.GridItem className="myNickname">{userInfo.nickname}</S.GridItem>
            <S.GridItem className="myStudyTime">
              {userInfo.studyTime}
            </S.GridItem>
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
