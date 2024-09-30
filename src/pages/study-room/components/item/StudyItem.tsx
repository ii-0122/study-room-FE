import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import * as S from './StudyItem.style';
import { useRef, useState } from 'react';

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
