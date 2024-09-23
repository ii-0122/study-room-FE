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

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  const isStudyRoomPage = location.pathname.startsWith('/study-room/');

  return (
    <LayoutStyle>
      {!isAuthPage && !isStudyRoomPage && <Sidebar />}
      <MainContentArea>
        {!isAuthPage && <Header />}
        {children}
      </MainContentArea>
      {isStudyRoomPage && <RSidebar />}
    </LayoutStyle>
  );
}
