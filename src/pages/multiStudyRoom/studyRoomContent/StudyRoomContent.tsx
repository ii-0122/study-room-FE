import StudyProfileBox from '@/components/studyProfileBox/StudyProfileBox';
import React, { useEffect, useRef, useState } from 'react';
import * as S from './StudyRoomContent.style';
import { useNavigate } from 'react-router-dom';
import StartPauseButton from '../../privateStudyRoom/components/button/StartPauseButton';
import LeaveButton from '../../privateStudyRoom/components/button/LeaveButton';
import RSidebar from '@/components/rsidebar/RSidebar';
import { useSocket } from '@/socket/SocketContext';
import { StudyRoomInfo, TimerInfo } from '@/models/studyRoom.model';
import { useAuthStore } from '@/stores';
import Header from '@/components/header/Header';
import { dataTagSymbol } from '@tanstack/react-query';
import { ServerToClientPlanner } from '@/models/studyRoomTodos.model';
import useStudyRoomStore from '@/stores/studyRoom.store';

const MultiStudyRoom = () => {
  // 임시 작성 코드
  const user = useAuthStore((state) => state.user);
  const setTodos = useStudyRoomStore((state) => state.setTodos);

  // const [userObjectId, setUserObjectId] = useState<string>('');
  const [studyRoomInfo, setStudyRoomInfo] = useState<StudyRoomInfo>();
  const [myTimerInfo, setMyTimerInfo] = useState<TimerInfo>({
    nickname: '',
    imageUrl:
      'https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg',
    totalTime: 0,
    state: 'stop',
    socketId: '',
  });
  const [usersTimerInfo, setUsersTimerInfo] = useState<TimerInfo[]>([]);
  const [initialCurrentTaskTime, setInitialCurrentTaskTime] =
    useState('00:00:00'); // 초기 현재 작업 시간

  const initUsersTimers = (currentMember: string[]) => {
    currentMember.forEach((value) => {
      if (value !== user.nickname) {
        const userExists = usersTimerInfo.some(
          (usersTimer) => usersTimer.nickname === value
        );
        if (!userExists) {
          const userTimer = {
            nickname: value,
            imageUrl: '',
            totalTime: 0,
            state: 'stop',
            socketId: '',
          };
          setUsersTimerInfo((prevUsers) => [...prevUsers, userTimer]);
        }
      }
    });
  };

  const numberToTimer = (totalTime: number) => {
    const totalSeconds = Math.floor(totalTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60; // 초 계산

    const formattedTime = [
      String(hours).padStart(2, '0'), // 시간
      String(minutes).padStart(2, '0'), // 분
      String(seconds).padStart(2, '0'), // 초
    ].join(':');

    return formattedTime;
  };

  const socket = useSocket();

  useEffect(() => {
    setMyTimerInfo((prevInfo) => ({
      ...prevInfo,
      nickname: user?.nickname,
    }));

    if (socket) {
      socket.connect();

      socket.on('getRoomAndMyInfo', (data: StudyRoomInfo) => {
        setStudyRoomInfo(data);
        setTotalStudyTime(numberToTimer(data.totalTime));
        setTodos(data.planner);
      });

      socket.on('addMemberAndRequestUserInfo', (data) => {
        // console.log(data);
        setUsersTimerInfo((prevUsers) => [...prevUsers, data]);
      });

      return () => {
        socket.off('getRoomAndMyInfo');
        socket.off('addMemberAndRequestUserInfo');
        socket.disconnect();
      };
    }
  }, [socket, user]);

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [currentTaskTime, setCurrentTaskTime] = useState(
    initialCurrentTaskTime
  );
  const [totalStudyTime, setTotalStudyTime] = useState('00:00:00');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateTimers = () => {
    setCurrentTaskTime((prevTime) => {
      const [hours, minutes, seconds] = prevTime.split(':').map(Number);
      const newSeconds = seconds + 1;
      const newMinutes = minutes + Math.floor(newSeconds / 60);
      const newHours = hours + Math.floor(newMinutes / 60);
      return `${String(newHours).padStart(2, '0')}:${String(newMinutes % 60).padStart(2, '0')}:${String(newSeconds % 60).padStart(2, '0')}`;
    });

    setTotalStudyTime((prevTotalTime) => {
      const [totalHours, totalMinutes, totalSeconds] = prevTotalTime
        .split(':')
        .map(Number);
      const totalElapsedSeconds =
        totalHours * 3600 + totalMinutes * 60 + totalSeconds; // 기존 총 시간(초로 변환)
      const newTotalSeconds = totalElapsedSeconds + 1; // 1초 추가

      const newHours = Math.floor(newTotalSeconds / 3600);
      const newMinutes = Math.floor((newTotalSeconds % 3600) / 60);
      const newSecs = newTotalSeconds % 60;

      return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSecs).padStart(2, '0')}`;
    });
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(updateTimers, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const handleStartPause = () => {
    const localTime = new Date().toLocaleString(); // 현재 로컬 시간
    if (!isActive) {
      // 시작 버튼 클릭 시 전송할 데이터
      setIsActive(true);
      const data = {
        nickname: myTimerInfo.nickname,
        currentTaskTime,
        localStartTime: localTime,
      };
      console.log('시작 버튼 클릭:', JSON.stringify(data));
    } else {
      // 일시 정지 버튼 클릭 시 전송할 데이터
      setIsActive(false);
      const data = {
        nickname: myTimerInfo.nickname,
        currentTaskTime,
        localPauseTime: localTime,
      };
      console.log('일시 정지 버튼 클릭:', JSON.stringify(data));
    }
  };

  const handleLeaveRoom = () => {
    const data = {
      nickname: myTimerInfo.nickname,
      totalStudyTime,
      currentTaskTime,
      exitTime: new Date().toLocaleString(),
    };

    console.log('나가기 버튼 클릭: ', JSON.stringify(data));

    navigate('/study-rooms');
  };

  return (
    <S.MultiStudyRoomStyle>
      <S.MainContentArea>
        <Header title="개인 공부방" />
        <S.StudyRoomWrap>
          <S.UserProfileContainer>
            <StudyProfileBox
              isGroup={true}
              isMe={true}
              userId={myTimerInfo.nickname}
              initialCurrentTaskTime={currentTaskTime}
              initialTotalStudyTime={totalStudyTime}
              profileImage={myTimerInfo.imageUrl}
              profileImageWidth="120px"
              profileImageHeight="120px"
            />
            {usersTimerInfo
              ? usersTimerInfo.map((data) => (
                  <StudyProfileBox
                    isGroup={true}
                    isMe={false}
                    userId={data.nickname}
                    initialCurrentTaskTime={currentTaskTime}
                    initialTotalStudyTime={totalStudyTime}
                    profileImage={data.imageUrl}
                    profileImageWidth="120px"
                    profileImageHeight="120px"
                  />
                ))
              : null}
          </S.UserProfileContainer>
          <S.InstructionText>
            우측 사이드바의 할 일을 선택하면 타이머가 시작됩니다.
          </S.InstructionText>
          <S.ButtonContainer>
            <StartPauseButton isActive={isActive} onClick={handleStartPause} />
            <LeaveButton onClick={handleLeaveRoom} />
          </S.ButtonContainer>
        </S.StudyRoomWrap>
      </S.MainContentArea>
      <RSidebar />
    </S.MultiStudyRoomStyle>
  );

  // return (
  //   <S.MultiStudyRoomStyle>
  //     <div>
  //       <S.UserProfileContainer>
  //         <StudyProfileBox
  //           isGroup={true}
  //           userId={myTimerInfo.nickname}
  //           initialCurrentTaskTime={currentTaskTime}
  //           initialTotalStudyTime={totalStudyTime}
  //           profileImage={myProfile.profileImage}
  //         />
  //         {userProfiles
  //           ? userProfiles.map((data, index) => (
  //               <StudyProfileBox
  //                 key={index}
  //                 isGroup={true}
  //                 userId={data.userId}
  //                 initialCurrentTaskTime={currentTaskTime}
  //                 initialTotalStudyTime={totalStudyTime}
  //                 profileImage={data.profileImage}
  //               />
  //             ))
  //           : null}
  //       </S.UserProfileContainer>
  //       <S.InstructionText>
  //         우측 사이드바의 할 일을 선택하면 타이머가 시작됩니다.
  //       </S.InstructionText>
  //       <S.ButtonContainer>
  //         <StartPauseButton isActive={isActive} onClick={handleStartPause} />
  //         <LeaveButton onClick={handleLeaveRoom} />
  //       </S.ButtonContainer>
  //     </div>
  //     <RSidebar />
  //   </S.MultiStudyRoomStyle>
  // );
};

export default MultiStudyRoom;
