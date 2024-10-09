import styled from 'styled-components';

export const HeaderContainer = styled.header<{ isStudyRoomPage?: boolean }>`
  background-color: white;
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.bgGray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  position: relative;
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 24px;
    background-color: ${({ theme }) => theme.color.mainStrong};
    margin-right: 10px;
    vertical-align: middle;
  }
`;

export const Button = styled.button`
  border-style: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.mainStrong};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border: 1px solid lightgray;
`;

export const DropdownProfileImg = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  border: 1px solid lightgray;
`;

export const DropDownWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  right: 20px;
  min-width: 240px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-10px')});
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid lightgray;
  width: 100%;
`;

export const DropdownText = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

export const DropdownItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 14px 20px;
  color: #616161;

  &:hover {
    background-color: #f4f4f4;
  }
`;
