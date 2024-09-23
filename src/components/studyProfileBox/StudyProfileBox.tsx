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
  profileImage = 'https://via.placeholder.com/622',
}) => {
  return (
    <S.StudyProfileBoxStyle $isGroup={isGroup}>
      <S.TimeDisplay $isGroup={isGroup}>
        <div className="time">{initialCurrentTaskTime}</div>
        <div className="time">{initialTotalStudyTime}</div>
      </S.TimeDisplay>
      <S.ProfileImageContainer $isGroup={isGroup}>
        <S.ProfileImage src={profileImage} alt="Profile" />
      </S.ProfileImageContainer>
      {isGroup && userId && (
        <S.UserIdDisplay $isGroup={isGroup}>{userId}</S.UserIdDisplay>
      )}
    </S.StudyProfileBoxStyle>
  );
};

export default StudyProfileBox;
