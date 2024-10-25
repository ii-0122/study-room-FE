import { useNavigate } from 'react-router-dom';
import BasicInfo from './components/BasicInfo';
import MyProfile from './components/MyProfile';
import * as S from './ProfilePage.style';
import { FaAngleRight } from 'react-icons/fa';
import { deleteAccount } from '@/apis/users.api';
import { logout } from '@/apis/auth.api';

export default function ProfilePage() {
  const router = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm('정말로 회원 탈퇴하시겠습니까?');

    if (confirmDelete) {
      await deleteAccount();
      logout();
      router('/login');
    }
  };

  return (
    <S.ContainerWrapper>
      <MyProfile />
      <BasicInfo />
      <S.RemoveAccountButton onClick={handleDeleteAccount}>
        <span>회원 탈퇴</span>
        <FaAngleRight />
      </S.RemoveAccountButton>
    </S.ContainerWrapper>
  );
}
