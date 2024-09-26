import { useForm } from 'react-hook-form';
import Chatting from './chatting/Chatting';
import { ChatReq } from '@/models/chat.model';
import * as S from './ChatRoom.style';
import { useEffect, useRef, useState } from 'react';

export default function ChatRoom() {
  const myNickname = 'myNickName'; // 추후 닉네임 불러와서 사용

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChatReq>({
    mode: 'onSubmit',
  });

  // 추후 TMP_CHATS 대신 빈 배열
  const [chatArray, setChatArray] = useState(TMP_CHATS);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const onSubmit = (data: ChatReq) => {
    setValue('message', '');
    const reqData = { ...data, nickname: myNickname };
    setChatArray([...chatArray, reqData]);

    // 여기에 송신 api 요청
    console.log(reqData);
  };

  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatArray]);

  return (
    <S.ChatRoomWrapper>
      <S.ChatArea>
        {/* {추후 채팅들 배열로 가져와서 사용} */}
        {chatArray.map((chatInfo, index) => {
          return (
            <Chatting
              key={index}
              chatInfo={chatInfo}
              isMine={chatInfo.nickname === myNickname}
            />
          );
        })}
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

const TMP_CHATS = [
  {
    nickname: 'abc',
    time: '08:53',
    message: 'ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
  },
  {
    nickname: 'veryLongNickname123',
    time: '08:54',
    message: 'ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
  },
  {
    nickname: '매우긴닉네임ㅡㅡㅡㅡ',
    time: '08:54',
    message: 'ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
  },
  { nickname: '내 닉네임', message: '내 메시지엔 time 없음?' },
];
