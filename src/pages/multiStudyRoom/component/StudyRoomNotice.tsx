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
    <div style={{ position: 'relative' }}>
      {isNoticeOpen ? (
        <S.NoticeDivOpen>
          <p>{notice}</p>
          <S.OpenButton>
            <IoChevronUpOutline onClick={toggleDiv} />
          </S.OpenButton>
        </S.NoticeDivOpen>
      ) : (
        <S.NoticeDivClosed>
          <p>{notice}</p>
          <S.OpenButton>
            <IoChevronDownOutline onClick={toggleDiv} />
          </S.OpenButton>
        </S.NoticeDivClosed>
      )}
    </div>
  );
};

export default StudyRoomNotice;
