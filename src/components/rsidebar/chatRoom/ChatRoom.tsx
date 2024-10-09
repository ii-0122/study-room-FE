import { useForm } from 'react-hook-form';
import Chatting from './chatting/Chatting';
import { ChatReq, ChatRes } from '@/models/chat.model';
import * as S from './ChatRoom.style';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useSocket } from '@/socket/SocketContext';
import useChatStore from '@/stores/chat.store';
import { useAuthStore } from '@/stores/auth.store';

export default function ChatRoom() {
  const user = useAuthStore((state) => state.user);
  const myNickname = user?.nickname;
  const socket = useSocket();
  const chatArray = useChatStore((state) => state.chatArray);
  const setChatArray = useChatStore.getState().setChatArray;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChatReq>({
    mode: 'onSubmit',
  });

  // const [chatArray, setChatArray] = useState<ChatRes[]>([]);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const onSubmit = (data: ChatReq) => {
    setValue('message', '');
    const reqData = {
      ...data,
      nickname: myNickname,
      time: dayjs().format('HH:mm'),
    };
    setChatArray(reqData);
    sendMessage(data.message);
  };

  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatArray]);

  // 임시 socket 코드 작성
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('notice', (data) => {
      console.log(data);
    });

    socket.on('receiveChat', (data) => {
      setChatArray(data);
      console.log(data);
    });

    socket.on('responseChat', (data) => {
      // 채팅이 잘 보내졌나 확인
      console.log(data);
    });

    return () => {
      socket.off('recieveChat');
      socket.off('responseChat');
      socket.off('notice');
    };
  }, [socket, user]);

  const sendMessage = (message: string) => {
    if (message) {
      const payload = { message };
      socket?.emit('sendChat', payload);
    }
  };
  // end

  return (
    <S.ChatRoomWrapper>
      <S.ChatArea>
        {/* {추후 채팅들 배열로 가져와서 사용} */}
        {chatArray?.map((chatInfo, index) => (
          <Chatting
            key={index}
            chatInfo={chatInfo}
            isMine={chatInfo.nickname == myNickname}
          />
        ))}
        <div ref={scrollBottomRef} />
      </S.ChatArea>

      <S.InputForm onSubmit={handleSubmit(onSubmit)}>
        <S.ChatErrorWrapper>
          <S.ChatInput
            {...register('message', {
              validate: {
                minLength: (value) =>
                  value.trim().length > 0 || '메시지를 입력하세요.',
              },
            })}
            placeholder="채팅을 입력하세요."
          />
          {errors.message && (
            <S.ErrorText>{errors.message.message}</S.ErrorText>
          )}
        </S.ChatErrorWrapper>
        <S.SendIconButton type="submit">
          <S.SendIcon />
        </S.SendIconButton>
      </S.InputForm>
    </S.ChatRoomWrapper>
  );
}

// const TMP_CHATS = [
//   {
//     nickname: 'abc',
//     time: '08:53',
//     message: 'ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
//   },
//   {
//     nickname: 'veryLongNickname123',
//     time: '08:54',
//     message: 'ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
//   },
//   {
//     nickname: '매우긴닉네임ㅡㅡㅡㅡ',
//     time: '08:54',
//     message: 'ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
//   },
// ];
