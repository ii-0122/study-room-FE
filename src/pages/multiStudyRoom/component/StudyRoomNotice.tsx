import * as S from './StudyRoomNotice.style';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

// Props로 공부방 정보를 받을 예정

import { useState } from 'react';

const StudyRoomNotice = ({ allInfo }) => {
  const notice = allInfo?.notice;

  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const toggleDiv = () => {
    setIsNoticeOpen((prevState) => !prevState);
  };

  return (
    <div style={{ position: 'relative' }}>
      {isNoticeOpen ? (
        <S.NoticeDivOpen>
          <text>{notice}</text>
          <S.OpenButton>
            <IoChevronUpOutline onClick={toggleDiv} />
          </S.OpenButton>
        </S.NoticeDivOpen>
      ) : (
        <S.NoticeDivClosed>
          <text>{notice}</text>
          <S.OpenButton>
            <IoChevronDownOutline onClick={toggleDiv} />
          </S.OpenButton>
        </S.NoticeDivClosed>
      )}
    </div>
  );
};

export default StudyRoomNotice;
