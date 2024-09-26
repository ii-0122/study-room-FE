import * as S from './Chatting.style';

interface ChattingProps {
  nickname: string;
  message: string;
  time?: string;
}

export default function Chatting({
  chatInfo,
  isMine,
}: {
  chatInfo: ChattingProps;
  isMine: boolean;
}) {
  const { nickname, message, time } = chatInfo;

  return (
    <S.ChatWrapper isMine={isMine}>
      <S.UserInfoArea>
        <S.UserProfile isMine={isMine} />
        <S.Nickname>{nickname}</S.Nickname>
      </S.UserInfoArea>
      <S.ChatInfoArea>
        <S.ChatBox isMine={isMine}>{message}</S.ChatBox>
        <S.CreatedTime isMine={isMine}>{time}</S.CreatedTime>
      </S.ChatInfoArea>
    </S.ChatWrapper>
  );
}
