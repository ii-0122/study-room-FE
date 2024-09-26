import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import * as S from './StudyItem.style';

interface StudyItemProps {
  title: string;
  imageUrl?: string;
  tagList?: string[];
  isPublic: boolean;
  maxNum: number;
  currentNum: number;
}

function StudyItem({
  title,
  imageUrl,
  tagList = [],
  isPublic,
  maxNum,
  currentNum,
}: StudyItemProps) {
  return (
    <S.StudyItemStyle>
      <S.ItemContainer imageUrl={imageUrl}>
        <S.ItemContent>
          <S.Privacy>{isPublic ? <FaLockOpen /> : <FaLock />}</S.Privacy>
          <S.Title>{title}</S.Title>
          <S.ParticipantCount>
            <MdPerson />
            {currentNum}/{maxNum}
          </S.ParticipantCount>
        </S.ItemContent>
      </S.ItemContainer>
      <S.ItemFooter>
        <S.ItemTitle>{title}</S.ItemTitle>
        <S.Hashtags>
          {tagList.map((tag, index) => (
            <S.Hashtag key={index}>{tag}</S.Hashtag>
          ))}
        </S.Hashtags>
      </S.ItemFooter>
    </S.StudyItemStyle>
  );
}

export default StudyItem;
