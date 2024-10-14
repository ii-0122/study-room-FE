import * as S from './Sidebar.style';
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineHome,
  AiOutlinePieChart,
  AiOutlineCarryOut,
  AiOutlineTrophy,
  AiOutlineRead,
  AiOutlineUser,
  AiOutlineComment,
} from 'react-icons/ai';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const selectedMenu = location.pathname;

  const [isNoteDropdownOpen, setIsNoteDropdownOpen] = useState(false);
  const [isStatsDropdownOpen, setIsStatsDropdownOpen] = useState(false);

  const toggleNoteDropdown = () => {
    setIsNoteDropdownOpen(!isNoteDropdownOpen);
  };

  const toggleStatsDropdown = () => {
    setIsStatsDropdownOpen(!isStatsDropdownOpen);
  };

  return (
    <S.SidebarContainer>
      <S.SidebarItem to="/" $focused={selectedMenu === '/'}>
        <AiOutlineHome />
        <span>홈</span>
      </S.SidebarItem>
      <S.SidebarItem
        to="/study-rooms"
        $focused={selectedMenu === '/study-rooms'}
      >
        <AiOutlineComment />
        <span>스터디룸</span>
      </S.SidebarItem>
      <S.SidebarItem to="/planner" $focused={selectedMenu === '/planner'}>
        <AiOutlineCarryOut />
        <span>플래너</span>
      </S.SidebarItem>
      <S.DropdownToggle onClick={toggleNoteDropdown}>
        <AiOutlineRead />
        <span>노트</span>
        <S.IconWrapper>
          {isNoteDropdownOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </S.IconWrapper>
      </S.DropdownToggle>
      <S.DropdownItems $isOpen={isNoteDropdownOpen}>
        <S.SidebarItem to="/notes/my" $focused={selectedMenu === '/notes/my'}>
          내 노트 조회
        </S.SidebarItem>
        <S.SidebarItem to="/notes/all" $focused={selectedMenu === '/notes/all'}>
          전체 노트 조회
        </S.SidebarItem>
        <S.SidebarItem to="/notes/new" $focused={selectedMenu === '/notes/new'}>
          노트 작성하기
        </S.SidebarItem>
      </S.DropdownItems>
      <S.SidebarItem to="/ranking" $focused={selectedMenu === '/ranking'}>
        <AiOutlineTrophy />
        랭킹
      </S.SidebarItem>
      <S.DropdownToggle onClick={toggleStatsDropdown}>
        <AiOutlinePieChart />
        <span>통계</span>
        <S.IconWrapper>
          {isStatsDropdownOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </S.IconWrapper>
      </S.DropdownToggle>
      <S.DropdownItems $isOpen={isStatsDropdownOpen}>
        <S.SidebarItem to="/stats/my" $focused={selectedMenu === '/stats/my'}>
          나의 통계
        </S.SidebarItem>
        <S.SidebarItem to="/stats/all" $focused={selectedMenu === '/stats/all'}>
          전체 통계
        </S.SidebarItem>
      </S.DropdownItems>
      <S.SidebarItem to="/profile" $focused={selectedMenu === '/profile'}>
        <AiOutlineUser />
        프로필
      </S.SidebarItem>
    </S.SidebarContainer>
  );
}
