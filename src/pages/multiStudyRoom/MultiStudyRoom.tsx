import { SocketProvider } from '@/socket/SocketContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { refreshTokenAPI } from '@/apis/refreshToken.api';
import useStudyRoomStore from '@/stores/studyRoom.store';
import useChatStore from '@/stores/chat.store';
import MultiStudyRoomContent from './multiStudyRoomContent/MultiStudyRoomContent';
import * as S from './MultiStudyRoom.style';

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

  const setTodos = useStudyRoomStore((state) => state.setTodos);
  const setSelectedTodo = useStudyRoomStore((state) => state.setSelectedTodo);
  const initChatArray = useChatStore((state) => state.initChatArray);

  // 페이지 언마운트 시 zustand 초기화
  useEffect(() => {
    return () => {
      setSelectedTodo(null); // selectedTodo 초기화
      setTodos([]);
      initChatArray();
    };
  }, [setSelectedTodo, setTodos, initChatArray]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <S.MultiStudyRoomStyle>
      <SocketProvider studyRoomId={id}>
        <MultiStudyRoomContent />
      </SocketProvider>
    </S.MultiStudyRoomStyle>
  );
};

export default MultiStudyRoom;
