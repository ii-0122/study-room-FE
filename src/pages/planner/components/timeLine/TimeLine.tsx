import * as S from './TimeLine.style';

interface TimeLineProps {
  startTime: string | undefined;
  endTime: string | undefined;
}

export default function TimeLine({ startTime, endTime }: TimeLineProps) {
  return (
    <S.TimeLineWrapper>
      <S.StartTime>{startTime}</S.StartTime>
      <S.EndTime>{endTime}</S.EndTime>
    </S.TimeLineWrapper>
  );
}
