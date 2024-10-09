import { useNavigate } from 'react-router-dom';
import { logout } from '@/apis/auth.api';
import * as S from './Header.style';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import {
  IoPersonCircle,
  IoSettingsOutline,
  IoLogOutOutline,
} from 'react-icons/io5';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  const { accessToken, user, clearAuthData } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    clearAuthData();
    toast.success('로그아웃 되었습니다.');
    navigate('/');
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const renderProfileImage = () => {
    return user?.imageUrl ? (
      <S.ProfileImg src={user?.imageUrl} alt="Profile" />
    ) : (
      <IoPersonCircle size={32} color="gray" />
    );
  };

  const renderDropdown = () => {
    return (
      <S.DropDownWrapper ref={dropdownRef} $isOpen={isOpen}>
        <S.UserInfo>
          {renderProfileImage()}
          <S.DropdownText>{user?.nickname} 님</S.DropdownText>
        </S.UserInfo>
        <S.DropdownItems onClick={() => navigate('/profile')}>
          <IoSettingsOutline /> 프로필 수정
        </S.DropdownItems>
        <S.DropdownItems onClick={handleLogout}>
          <IoLogOutOutline /> 로그아웃
        </S.DropdownItems>
      </S.DropDownWrapper>
    );
  };

  return (
    <S.HeaderContainer>
      <S.HeaderTitle>{title}</S.HeaderTitle>
      <S.ButtonWrapper>
        {accessToken ? (
          <>
            <div ref={profileRef} onClick={toggleDropdown}>
              {renderProfileImage()}
            </div>
            {renderDropdown()}
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
