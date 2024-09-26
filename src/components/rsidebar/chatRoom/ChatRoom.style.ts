import styled from 'styled-components';
import { IoIosSend } from 'react-icons/io';

export const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 75px); // - input영역 높이
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InputForm = styled.form`
  display: flex;
  min-height: 75px;
  width: 100%;
  flex-shrink: 0;
  border-top: 1px solid ${({ theme }) => theme.color.plannerGray};
  position: absolute;
  bottom: 0;
  padding: 20px;
  align-items: center;
  background-color: white;
  border-radius: 0 0 15px 15px;
`;

export const ChatErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ChatInput = styled.input`
  font-size: 20px;
  border: none;
  &:focus {
    outline: none;
  }
  flex: 1;
  border-radius: 8px;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 3px;
`;

export const SendIconButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: auto;

  &:hover {
    cursor: pointer;
  }
`;

export const SendIcon = styled(IoIosSend)`
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.color.mainStrong};
`;
