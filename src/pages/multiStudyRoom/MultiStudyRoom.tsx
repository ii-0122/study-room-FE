import { SocketProvider } from '@/socket/SocketContext';
import StudyRoomContent from './multiStudyRoomContent/MultiStudyRoomContent';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { refreshTokenAPI } from '@/apis/refreshToken.api';

const MultiStudyRoom = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true); // 로딩 상태 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshTokenAPI();
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 변경
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <SocketProvider studyRoomId={id}>
      <StudyRoomContent />
    </SocketProvider>
  );
};

export default MultiStudyRoom;
