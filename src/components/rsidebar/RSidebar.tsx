import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import Todos from './todos/Todos';
import ChatRoom from './chatRoom/ChatRoom';
import { formatDateTime } from './utils/dateFormat';
import { useSocket } from '@/socket/SocketContext';
import useChatStore from '@/stores/chat.store';
import { ChatRes } from '@/models/chat.model';
import { showNotification } from './utils/notification';
import * as S from './RSidebar.style';

type Tabs = '할 일' | '채팅';

const RSidebar = () => {
  const socket = useSocket();
  const setChatArray = useChatStore.getState().setChatArray;
  const [hasNewChat, setHasNewChat] = useState(false);

  const [currentDateTime, setCurrentDateTime] =
    useState<string>(formatDateTime());

  const [selectedTab, setSelectedTab] = useState<Tabs>('할 일');

  const [isNtfAllowed, setIsNtfAllowed] = useState(true);
  const [windowVisibility, setWindowVisibility] = useState(
    document.visibilityState === 'visible'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(formatDateTime());
    }, 1000);
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHasNewChat(false);
  }, [selectedTab]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setWindowVisibility(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // socket
  useEffect(() => {
    if (!socket) {
      return;
    }

    const commonCase = isNtfAllowed && Notification.permission === 'granted';
    const case1 = !windowVisibility;

    const handleReceiveChat = throttle((data: ChatRes) => {
      setChatArray(data);
      setHasNewChat(true);
      if (commonCase && case1) {
        showNotification(data.nickname, data.message);
      }

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
      socket.off('receiveChat');
      socket.off('responseChat');
      socket.off('notice');
    };
  }, [socket, isNtfAllowed, selectedTab, windowVisibility]);

  const handleTabClick = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  const handleNtf = () => {
    if (
      Notification.permission === 'denied' ||
      Notification.permission === 'default'
    ) {
      return Notification.requestPermission();
    }

    setIsNtfAllowed(!isNtfAllowed);
  };

  useEffect(() => {
    console.log(isNtfAllowed);
  }, [isNtfAllowed]);

  return (
    <S.RSidebarStyle>
      <S.Wrapper>
        <S.CurrentTime>{currentDateTime}</S.CurrentTime>
        <S.ContentConfigsWrapper>
          <S.ConfigsWrapper>
            <S.NotificationConfig onClick={handleNtf}>
              <span>백그라운드 알림</span>
              {isNtfAllowed ? <S.BellIcon /> : <S.SlashBellIcon />}
            </S.NotificationConfig>
          </S.ConfigsWrapper>
          <S.ContentWrapper>
            {selectedTab === '할 일' ? <Todos /> : <ChatRoom />}
          </S.ContentWrapper>
        </S.ContentConfigsWrapper>
        <S.TabsWrapper>
          {['할 일', '채팅'].map((tab, index) => {
            let isSelected = false;
            if (selectedTab === tab) {
              isSelected = true;
            }

            const isNeedAlert =
              selectedTab !== '채팅' && tab === '채팅' && hasNewChat;
            return (
              <S.Tab
                key={index}
                isSelected={isSelected}
                onClick={() => handleTabClick(tab as Tabs)}
              >
                {isNeedAlert && <S.newChatAlert />}
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
