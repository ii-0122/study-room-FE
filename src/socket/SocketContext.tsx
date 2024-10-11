import { useAuthStore } from '@/stores/auth.store';
import { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const SocketContext = createContext<typeof Socket | null>(null);

interface SocketProviderProps {
  studyRoomId: string | undefined;
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  studyRoomId,
  children,
}) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const { accessToken, user } = useAuthStore();
  const roomId = studyRoomId; // 방 ID
  const nickname = user ? user.nickname : ''; // 사용자 닉네임
  const imageUrl = user ? user.imageUrl : ''; // 사용자 이미지 URL

  useEffect(() => {
    if (!roomId) return;
    console.log(roomId);

    const newSocket = io(`${import.meta.env.VITE_REACT_APP_API_URL}/rooms`, {
      transports: ['websocket'],
      query: { roomId, nickname, imageUrl },
      auth: {
        token: `Bearer ${accessToken}`,
      },
    });
    setSocket(newSocket);
  }, [accessToken, user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
