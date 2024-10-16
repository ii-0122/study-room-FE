import { SocketProvider } from '@/socket/SocketContext';
import { useParams } from 'react-router-dom';
import MultiStudyRoomContent from './multiStudyRoomContent/MultiStudyRoomContent';
import * as S from './MultiStudyRoom.style';

// Props로 공부방 정보를 받을 예정
const MultiStudyRoom = () => {
  const { id } = useParams();

  return (
    <S.MultiStudyRoomStyle>
      <SocketProvider studyRoomId={id}>
        <MultiStudyRoomContent />
      </SocketProvider>
    </S.MultiStudyRoomStyle>
  );
};

export default MultiStudyRoom;
