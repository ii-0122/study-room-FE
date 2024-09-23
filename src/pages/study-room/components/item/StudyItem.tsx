import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import * as S from './StudyItem.style';

interface StudyItemProps {
  title: string;
  imageUrl?: string;
  hashtags?: string[];
  isPublic: boolean;
  maxParticipants: number;
  currentParticipants: number;
}

function StudyItem({
  title,
  imageUrl,
  hashtags = [],
  isPublic,
  maxParticipants,
  currentParticipants,
}: StudyItemProps) {
  return (
    <S.StudyItemStyle>
      <S.ItemContainer imageUrl={imageUrl}>
        <S.ItemContent>
          <S.Privacy>{isPublic ? <FaLockOpen /> : <FaLock />}</S.Privacy>
          <S.Title>{title}</S.Title>
          <S.ParticipantCount>
            <MdPerson />
            {currentParticipants}/{maxParticipants}
          </S.ParticipantCount>
        </S.ItemContent>
      </S.ItemContainer>
      <S.ItemFooter>
        <S.ItemTitle>{title}</S.ItemTitle>
        <S.Hashtags>
          {hashtags.map((hashtag, index) => (
            <S.Hashtag key={index}>#{hashtag}</S.Hashtag>
          ))}
        </S.Hashtags>
      </S.ItemFooter>
    </S.StudyItemStyle>
  );
}

export default StudyItem;
