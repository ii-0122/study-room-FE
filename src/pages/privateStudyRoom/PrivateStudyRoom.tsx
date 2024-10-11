import { SocketProvider } from '@/socket/SocketContext';
import PrivateStudyRoomContent from './privateStudyRoomContent/PrivateStudyRoomContent';
import { useParams } from 'react-router-dom';

// Props로 공부방 정보를 받을 예정
const PrivateStudyRoom = () => {
  const { id } = useParams();

  return (
    <SocketProvider studyRoomId={id}>
      <PrivateStudyRoomContent />
    </SocketProvider>
  );
};

export default PrivateStudyRoom;
