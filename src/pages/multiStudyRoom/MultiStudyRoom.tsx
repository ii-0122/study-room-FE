import { SocketProvider } from '@/socket/SocketContext';
import StudyRoomContent from './multiStudyRoomContent/MultiStudyRoomContent';
import { useParams } from 'react-router-dom';

// Props로 공부방 정보를 받을 예정
const MultiStudyRoom = () => {
  const { id } = useParams();

  return (
    <SocketProvider studyRoomId={id}>
      <StudyRoomContent />
    </SocketProvider>
  );
};

export default MultiStudyRoom;
