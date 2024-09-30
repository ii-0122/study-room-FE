import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MainContentArea, LayoutStyle } from './Layout.style';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import RSidebar from '../rsidebar/RSidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const authPagePath =
    location.pathname === '/login' || location.pathname === '/signup';

  const studyRoomPagePath = location.pathname.startsWith('/study-room/');

  const pageTitles: { [key: string]: string } = {
    '/': '홈',
    '/profile': '프로필',
    '/planner': '스터디 플래너',
    '/study-rooms': '스터디방',
  };

  const pageTitle = pageTitles[location.pathname];

  return (
    <LayoutStyle>
      {!authPagePath && !studyRoomPagePath && <Header title={pageTitle} />}
      <MainContentArea>
        {!authPagePath && !studyRoomPagePath && <Sidebar />}
        {children}
        {studyRoomPagePath && <RSidebar />}
      </MainContentArea>
    </LayoutStyle>
  );
}
