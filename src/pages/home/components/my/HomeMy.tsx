import * as S from './HomeMy.style';
import HomeStatistics from './statistics/HomeStatistics';
import HomeTodo from './todo/HomeTodo';

function HomeMy() {
  return (
    <S.HomeMyStyle>
      <HomeTodo />
      <S.HorizontalLine />
      <HomeStatistics />
    </S.HomeMyStyle>
  );
}

export default HomeMy;
