import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MainContentArea, LayoutStyle } from './Layout.style';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
//import RSidebar from '../rsidebar/RSidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const authPagePath =
    location.pathname === '/login' || location.pathname === '/signup';

  const studyRoomPagePath = location.pathname.startsWith('/study-room/');
  const multiStudyRoomPagePath_temp =
    location.pathname.startsWith('/multi-study-room/');

  const pageTitles: { [key: string]: string } = {
    '/': '홈',
    '/profile': '프로필',
    '/planner': '플래너',
    '/study-rooms': '스터디룸',
    '/ranking': '랭킹',
  };

  const pageTitle = pageTitles[location.pathname];

  return (
    <LayoutStyle>
      {!authPagePath && !studyRoomPagePath && !multiStudyRoomPagePath_temp && (
        <Header title={pageTitle} />
      )}
      <MainContentArea>
        {!authPagePath &&
          !studyRoomPagePath &&
          !multiStudyRoomPagePath_temp && <Sidebar />}
        {children}
        {/* {studyRoomPagePath && <RSidebar />} */}
      </MainContentArea>
    </LayoutStyle>
  );
}
