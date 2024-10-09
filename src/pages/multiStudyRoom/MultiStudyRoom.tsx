import { SocketProvider } from '@/socket/SocketContext';
import StudyRoomContent from './studyRoomContent/StudyRoomContent';
import { useParams } from 'react-router-dom';

// Props로 공부방 정보를 받을 예정
const MultiStudyRoom = () => {
  // const { roomId } = useParams();
  const roomId = '66f431a1774e0c087e146647';

  return (
    <SocketProvider studyRoomId={roomId}>
      <StudyRoomContent />
    </SocketProvider>
  );
};

export default MultiStudyRoom;
