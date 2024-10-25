import { MdPerson } from 'react-icons/md';
import * as S from './StudyItem.style';
import { useRef, useState } from 'react';
import { StudyItem as StudyItemType } from '@/types/studyRoom';
import { FaLock, FaUnlock } from 'react-icons/fa6';

function StudyItem({
  title,
  imageUrl,
  tagList = [],
  isPublic,
  maxNum,
  currentNum,
}: StudyItemType) {
  const hashtagsRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (hashtagsRef.current?.offsetLeft || 0));
    setScrollLeft(hashtagsRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !hashtagsRef.current) return;
    e.preventDefault();
    const x = e.pageX - (hashtagsRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1; // 스크롤 속도 조정
    hashtagsRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <S.StudyItemStyle>
      <S.ItemContainer imageUrl={imageUrl}>
        <S.ItemContent>
          <S.Privacy>{isPublic ? <FaUnlock /> : <FaLock />}</S.Privacy>
          <S.TextWrap>
            <S.Title>{title}</S.Title>
            <S.ParticipantCount>
              <MdPerson />
              {currentNum}/{maxNum}
            </S.ParticipantCount>
          </S.TextWrap>
        </S.ItemContent>
      </S.ItemContainer>
      <S.ItemFooter>
        <S.ItemTitle>{title}</S.ItemTitle>
        <S.Hashtags
          ref={hashtagsRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {tagList.map((tag, index) => (
            <S.Hashtag key={index}>{tag}</S.Hashtag>
          ))}
        </S.Hashtags>
      </S.ItemFooter>
    </S.StudyItemStyle>
  );
}

export default StudyItem;
