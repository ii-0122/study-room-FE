import { useEffect, useState } from 'react';
import * as S from './RSidebar.style';
import Todos from './todos/Todos';
import ChatRoom from './chatRoom/ChatRoom';
import { formatDateTime } from './utils/dateFormat';

type Tabs = '노트' | '할 일' | '채팅';

export default function RSidebar() {
  const [currentDateTime, setCurrentDateTime] =
    useState<string>(formatDateTime());

  const [selectedTab, setSelectedTab] = useState<Tabs>('할 일');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(formatDateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tab: Tabs) => {
    if (tab === '노트') {
      window.open('/', '_blank'); // 추후 노트작성 페이지로 연결
      return;
    } else {
      setSelectedTab(tab);
    }
  };

  return (
    <S.RSidebarStyle>
      <S.Wrapper>
        <S.CurrentTime>{currentDateTime}</S.CurrentTime>
        <S.ContentWrapper>
          {selectedTab === '할 일' ? <Todos /> : <ChatRoom />}
        </S.ContentWrapper>
        <S.TabsWrapper>
          {['노트', '할 일', '채팅'].map((tab, index) => {
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
}
