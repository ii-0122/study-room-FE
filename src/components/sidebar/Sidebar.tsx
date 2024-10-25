import * as S from './Sidebar.style';
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineHome,
  AiOutlinePieChart,
  AiOutlineCarryOut,
  AiOutlineTrophy,
  AiOutlineUser,
  AiOutlineComment,
} from 'react-icons/ai';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const selectedMenu = location.pathname;

  const [isStatsDropdownOpen, setIsStatsDropdownOpen] = useState(false);

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
        <S.SidebarItem
          to="/statistics/my"
          $focused={selectedMenu === '/statistics/my'}
        >
          나의 통계
        </S.SidebarItem>
        <S.SidebarItem
          to="/statistics/all"
          $focused={selectedMenu === '/statistics/all'}
        >
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
