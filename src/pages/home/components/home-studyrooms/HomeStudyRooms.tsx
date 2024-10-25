import { useNavigate } from 'react-router-dom';
import HomeStudyItem from './item/HomeStudyItem';
import * as S from './HomeStudyRooms.style';
import ToStudyRooms from './button/ToStudyRooms';
import ToPrivateButton from './button/ToPrivateButton';
import { StudyItem } from '@/types/studyRoom';
import { HomeRankingStyle } from '../home-ranking/HomeRanking.style';
import Loader from '@/components/loader/Loader';
import { homefetchRooms } from '@/apis/studyRooms.api';
import { useQuery } from '@tanstack/react-query';

interface HomeStudyRoomsProps {
  limit: number;
  isJWT: boolean;
}

const HomeStudyRooms = ({ limit, isJWT }: HomeStudyRoomsProps) => {
  const navigate = useNavigate();

  const {
    data: rooms,
    error,
    isLoading,
  } = useQuery<StudyItem[], Error>({
    queryKey: ['studyRooms', limit],
    queryFn: () => homefetchRooms(limit),
  });

  const handleItemClick = (id: string) => {
    if (isJWT) {
      navigate(`/study-room/${id}`);
    } else {
      navigate('/login');
    }
  };

  if (isLoading) {
    return (
      <HomeRankingStyle>
        <Loader />
      </HomeRankingStyle>
    );
  }

  if (error) {
    return (
      <S.Text>{error.message || '알 수 없는 오류가 발생했습니다.'}</S.Text>
    );
  }

  return (
    <S.HomeStudyRoomsStyle>
      <S.Title>스터디룸</S.Title>
      <S.Wrap>
        <S.StudyRoomWrap>
          {rooms &&
            rooms.map((room) => {
              const roomId = room._id;
              return (
                <HomeStudyItem
                  key={roomId}
                  title={room.title}
                  imageUrl={room.imageUrl}
                  tagList={room.tagList}
                  isPublic={room.isPublic}
                  isChat={room.isChat}
                  maxNum={room.maxNum}
                  currentNum={room.currentNum}
                  onClick={roomId ? () => handleItemClick(roomId) : undefined}
                />
              );
            })}
        </S.StudyRoomWrap>
        <S.ButtonWrap>
          <ToPrivateButton />
          <ToStudyRooms />
        </S.ButtonWrap>
      </S.Wrap>
    </S.HomeStudyRoomsStyle>
  );
};

export default HomeStudyRooms;
