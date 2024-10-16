import * as S from './StudyRoomNotice.style';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useState } from 'react';
import { StudyRoomInfo } from '@/models/studyRoom.model';

interface StudyRoomNoticeProps {
  allInfo: StudyRoomInfo | undefined;
}

const StudyRoomNotice: React.FC<StudyRoomNoticeProps> = ({ allInfo }) => {
  const notice = allInfo?.notice;

  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const toggleDiv = () => {
    setIsNoticeOpen((prevState) => !prevState);
  };

  return (
    <S.StudyRoomNoticeStyle>
      {isNoticeOpen ? (
        <S.NoticeDivOpen onClick={toggleDiv}>
          <S.OpenText>{notice}</S.OpenText>
          <IoChevronUpOutline />
        </S.NoticeDivOpen>
      ) : (
        <S.NoticeDivClosed onClick={toggleDiv}>
          <S.CloseText>{notice}</S.CloseText>
          <IoChevronDownOutline />
        </S.NoticeDivClosed>
      )}
    </S.StudyRoomNoticeStyle>
  );
};

export default StudyRoomNotice;
