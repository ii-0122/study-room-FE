import { useNavigate } from 'react-router-dom';
import { logout } from '@/apis/auth.api';
import * as S from './Header.style';
import { useAuthStore } from '@/stores/auth.store';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  const { accessToken, clearAuthData } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    clearAuthData();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <S.HeaderContainer>
      <S.HeaderTitle>{title}</S.HeaderTitle>
      <S.ButtonWrapper>
        {accessToken ? (
          <>
            <S.Button onClick={handleLogout}>로그아웃</S.Button>
            <S.Button onClick={() => navigate('/profile')}>프로필</S.Button>
          </>
        ) : (
          <>
            <S.Button onClick={() => navigate('/login')}>로그인</S.Button>
            <S.Button onClick={() => navigate('/signup')}>회원가입</S.Button>
          </>
        )}
      </S.ButtonWrapper>
    </S.HeaderContainer>
  );
}
