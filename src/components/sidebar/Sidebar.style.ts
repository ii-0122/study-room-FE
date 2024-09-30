import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarContainer = styled.nav`
  min-width: 240px;
  min-height: calc(100vh - 100px);
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
`;

export const SidebarItem = styled(Link)<{ $focused?: boolean }>`
  font-size: 18px;
  padding: 16px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  cursor: pointer;

  color: ${({ $focused, theme }) =>
    $focused ? theme.color.mainStrong : 'black'};
  background-color: ${({ $focused, theme }) =>
    $focused ? theme.color.main : 'white'};

  &:hover {
    filter: brightness(0.97);
  }
`;

export const DropdownToggle = styled.div`
  font-size: 18px;
  padding: 16px 12px;
  gap: 12px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.bgDarkGray};
    background-color: ${({ theme }) => theme.color.bgLightGray};
  }
`;

export const DropdownItems = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  padding-left: 20px;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.bgLightGray};
`;

export const IconWrapper = styled.div`
  margin-left: auto;
`;
