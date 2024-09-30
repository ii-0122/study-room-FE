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
