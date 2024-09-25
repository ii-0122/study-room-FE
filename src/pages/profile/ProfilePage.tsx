import BasicInfo from './components/BasicInfo';
import MyProfile from './components/MyProfile';
import * as S from './ProfilePage.style';
import { FaAngleRight } from 'react-icons/fa';

export default function ProfilePage() {
  return (
    <S.ContainerWrapper>
      <MyProfile />
      <BasicInfo />
      <S.RemoveAccountButton>
        <span>계정 탈퇴</span>
        <FaAngleRight />
      </S.RemoveAccountButton>
    </S.ContainerWrapper>
  );
}
