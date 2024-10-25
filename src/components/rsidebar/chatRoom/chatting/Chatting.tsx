import ProfileImageBox from '@/components/studyProfileBox/imagebox/ProfileImageBox';
import * as S from './Chatting.style';

interface ChattingProps {
  nickname: string;
  message: string;
  time: string;
  imageUrl: string;
}

export default function Chatting({
  chatInfo,
  isMine,
}: {
  chatInfo: ChattingProps;
  isMine: boolean;
}) {
  const { nickname, message, time, imageUrl } = chatInfo;
  const isNotice = nickname === 'notice' ? true : false;

  return (
    <>
      {isNotice ? (
        <S.Notice>
          <p>{message}</p>
        </S.Notice>
      ) : (
        <S.ChatWrapper isMine={isMine}>
          <S.UserInfoArea>
            {/* @TODO ProfileImageBox에 src(이미지url) 연결 필요*/}
            <ProfileImageBox src={imageUrl} width="60px" height="60px" />
            <S.Nickname>{nickname}</S.Nickname>
          </S.UserInfoArea>
          <S.ChatInfoArea>
            <S.ChatBox isMine={isMine}>{message}</S.ChatBox>
            <S.CreatedTime isMine={isMine}>{time}</S.CreatedTime>
          </S.ChatInfoArea>
        </S.ChatWrapper>
      )}
    </>
  );
}
