import ProfileImageBox from '@/components/studyProfileBox/imagebox/ProfileImageBox';
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
        {/* @TODO ProfileImageBox에 src(이미지url) 연결 필요*/}
        <ProfileImageBox width="60px" height="60px" />
        <S.Nickname>{nickname}</S.Nickname>
      </S.UserInfoArea>
      <S.ChatInfoArea>
        <S.ChatBox isMine={isMine}>{message}</S.ChatBox>
        <S.CreatedTime isMine={isMine}>{time}</S.CreatedTime>
      </S.ChatInfoArea>
    </S.ChatWrapper>
  );
}
