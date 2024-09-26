import ProfileImageBox from './imagebox/ProfileImageBox';
import * as S from './StudyProfileBox.style';

interface StudyProfileBoxProps {
  isGroup?: boolean;
  userId?: string;
  initialCurrentTaskTime?: string;
  initialTotalStudyTime?: string;
  profileImage?: string;
}

const StudyProfileBox: React.FC<StudyProfileBoxProps> = ({
  isGroup = false,
  userId,
  initialCurrentTaskTime = '00:00:00',
  initialTotalStudyTime = '00:00:00',
  profileImage = '',
}) => {
  return (
    <S.StudyProfileBoxStyle $isGroup={isGroup}>
      <S.TimeDisplay $isGroup={isGroup}>
        <div className="time">{initialCurrentTaskTime}</div>
        <div className="time">{initialTotalStudyTime}</div>
      </S.TimeDisplay>
      <ProfileImageBox src={profileImage} width="622px" height="622px" />
      {isGroup && userId && (
        <S.UserIdDisplay $isGroup={isGroup}>{userId}</S.UserIdDisplay>
      )}
    </S.StudyProfileBoxStyle>
  );
};

export default StudyProfileBox;
