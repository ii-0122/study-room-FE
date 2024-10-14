import { useEffect, useState } from 'react';
import * as S from './RSidebar.style';
import Todos from './todos/Todos';
import ChatRoom from './chatRoom/ChatRoom';
import { formatDateTime } from './utils/dateFormat';
import { useSocket } from '@/socket/SocketContext';
import { throttle } from 'lodash';
import useChatStore from '@/stores/chat.store';

type Tabs = '할 일' | '채팅';

const RSidebar = () => {
  const socket = useSocket();
  const setChatArray = useChatStore.getState().setChatArray;

  const [currentDateTime, setCurrentDateTime] =
    useState<string>(formatDateTime());

  const [selectedTab, setSelectedTab] = useState<Tabs>('할 일');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(formatDateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // socket
  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleReceiveChat = throttle((data) => {
      setChatArray(data);
      // console.log(data);
    }, 300);

    const handleNotice = throttle((data) => {
      // console.log(data);
      const noticeChat = {
        nickname: 'notice',
        message: data.message,
        time: data.time,
        imageUrl: '',
      };
      setChatArray(noticeChat);
    }, 300);

    socket.on('responseChat', (data) => {
      // 채팅이 잘 보내졌나 확인
      console.log(data);
    });

    socket.on('notice', handleNotice);
    socket.on('receiveChat', handleReceiveChat);

    return () => {
      socket.off('recieveChat');
      socket.off('responseChat');
      socket.off('notice');
    };
  }, [socket]);

  const handleTabClick = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  return (
    <S.RSidebarStyle>
      <S.Wrapper>
        <S.CurrentTime>{currentDateTime}</S.CurrentTime>
        <S.ContentWrapper>
          {selectedTab === '할 일' ? <Todos /> : <ChatRoom />}
        </S.ContentWrapper>
        <S.TabsWrapper>
          {['할 일', '채팅'].map((tab, index) => {
            let isSelected = false;
            if (selectedTab === tab) {
              isSelected = true;
            }

            return (
              <S.Tab
                key={index}
                isSelected={isSelected}
                onClick={() => handleTabClick(tab as Tabs)}
              >
                {tab}
              </S.Tab>
            );
          })}
        </S.TabsWrapper>
      </S.Wrapper>
    </S.RSidebarStyle>
  );
};

export default RSidebar;
