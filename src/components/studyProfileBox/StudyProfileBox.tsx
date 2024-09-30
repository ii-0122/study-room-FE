import ProfileImageBox from './imagebox/ProfileImageBox';
import * as S from './StudyProfileBox.style';

interface StudyProfileBoxProps {
  isGroup?: boolean;
  userId?: string;
  initialCurrentTaskTime?: string;
  initialTotalStudyTime?: string;
  profileImage?: string;
  profileImageWidth?: string;
  profileImageHeight?: string;
}

const StudyProfileBox: React.FC<StudyProfileBoxProps> = ({
  isGroup = false,
  userId,
  initialCurrentTaskTime = '00:00:00',
  initialTotalStudyTime = '00:00:00',
  profileImage = '',
  profileImageWidth = '',
  profileImageHeight = '',
}) => {
  return (
    <S.StudyProfileBoxStyle $isGroup={isGroup}>
      <S.ContentDisplay $isGroup={isGroup}>
        {!isGroup && <div className="content">선택된 할 일 공부 시간</div>}
        <div className="content">전체 공부 시간</div>
      </S.ContentDisplay>
      <S.TimeDisplay $isGroup={isGroup}>
        {!isGroup && <div className="time">{initialCurrentTaskTime}</div>}
        <div className="time">{initialTotalStudyTime}</div>
      </S.TimeDisplay>
      <ProfileImageBox
        src={profileImage}
        width={profileImageWidth}
        height={profileImageHeight}
      />
      {isGroup && userId && (
        <S.UserIdDisplay $isGroup={isGroup}>{userId}</S.UserIdDisplay>
      )}
    </S.StudyProfileBoxStyle>
  );
};

export default StudyProfileBox;
