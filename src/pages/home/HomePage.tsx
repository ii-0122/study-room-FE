import { useAuthStore } from '@/stores/auth.store';
import * as S from './HomePage.style';
import HomeMy from './components/my/HomeMy';
import HomeStudyRooms from './components/home-studyrooms/HomeStudyRooms';
import HomeRanking from './components/home-ranking/HomeRanking';

export default function HomePage() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return (
      <S.JWTPageStyle>
        <S.Wrap>
          <HomeStudyRooms limit={2} isJWT={true} />
          <HomeRanking isJWT={true} />
        </S.Wrap>
        <HomeMy />
      </S.JWTPageStyle>
    );
  } else {
    return (
      <S.HomePageStyle>
        <HomeStudyRooms limit={6} isJWT={false} />
        <HomeRanking isJWT={false} />
      </S.HomePageStyle>
    );
  }
}
