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
  height: 90%;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-top: 5%;
  gap: 10px;
`;

export const InputForm = styled.form`
  display: flex;
  height: 10%;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.color.plannerGray};
  position: absolute;
  bottom: 0;
  padding: 12px;
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
  font-size: 1rem;
  border: none;
  &:focus {
    outline: none;
  }
  flex: 1;
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
  width: 25px;
  height: 25px;
  color: ${({ theme }) => theme.color.mainStrong};
`;
