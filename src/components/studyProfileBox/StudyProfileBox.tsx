import ProfileImageBox from './imagebox/ProfileImageBox';
import * as S from './StudyProfileBox.style';

interface StudyProfileBoxProps {
  isGroup: boolean;
  isMe?: boolean;
  userId?: string;
  initialCurrentTaskTime?: string;
  initialTotalStudyTime?: string;
  profileImage?: string;
  profileImageWidth?: string;
  profileImageHeight?: string;
  isManager?: boolean;
}

const StudyProfileBox: React.FC<StudyProfileBoxProps> = ({
  isGroup,
  isMe,
  userId,
  initialCurrentTaskTime = '00:00:00',
  initialTotalStudyTime = '00:00:00',
  profileImage = '',
  profileImageWidth = '',
  profileImageHeight = '',
  isManager,
}) => {
  return (
    <S.StudyProfileBoxStyle $isGroup={isGroup}>
      <S.ContentDisplay $isGroup={isGroup} $isMe={isMe ? isMe : false}>
        {(!isGroup || isMe) && (
          <div className="content">선택된 할 일 공부 시간</div>
        )}
        <div className="content">전체 공부 시간</div>
      </S.ContentDisplay>
      <S.TimeDisplay $isGroup={isGroup} $isMe={isMe ? isMe : false}>
        {(!isGroup || isMe) && (
          <div className="time">{initialCurrentTaskTime}</div>
        )}
        <div className="time">{initialTotalStudyTime}</div>
      </S.TimeDisplay>
      <ProfileImageBox
        src={profileImage}
        width={profileImageWidth}
        height={profileImageHeight}
      />
      {isGroup && userId && (
        <S.UserIdDisplay $isGroup={isGroup}>
          {isManager && <S.ManagerIcon />}
          {userId}
        </S.UserIdDisplay>
      )}
    </S.StudyProfileBoxStyle>
  );
};

export default StudyProfileBox;
