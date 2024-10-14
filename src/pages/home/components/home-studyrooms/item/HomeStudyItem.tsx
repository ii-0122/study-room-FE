import { MdPerson } from 'react-icons/md';
import { PiChatCircleDotsFill, PiChatCircleSlashFill } from 'react-icons/pi';
import * as S from './HomeStudyItem.style';
import { FaLock, FaUnlock } from 'react-icons/fa6';
import { StudyItem } from '@/types/studyRoom';

interface HomeStudyItemProps extends StudyItem {
  onClick?: () => void;
}

function HomeStudyItem({
  title,
  imageUrl,
  isPublic,
  isChat,
  currentNum,
  maxNum,
  onClick,
}: HomeStudyItemProps) {
  return (
    <S.HomeStudyItemStyle imageUrl={imageUrl} onClick={onClick}>
      <S.ItemContainer imageUrl={imageUrl}>
        <S.Title>{title}</S.Title>
        <S.Footer>
          <S.IconWrap>
            <S.Privacy>{isPublic ? <FaUnlock /> : <FaLock />}</S.Privacy>
            <S.Chat>
              {isChat ? <PiChatCircleDotsFill /> : <PiChatCircleSlashFill />}
            </S.Chat>
          </S.IconWrap>
          <S.ParticipantCount>
            <MdPerson />
            {currentNum}/{maxNum}
          </S.ParticipantCount>
        </S.Footer>
      </S.ItemContainer>
    </S.HomeStudyItemStyle>
  );
}

export default HomeStudyItem;
