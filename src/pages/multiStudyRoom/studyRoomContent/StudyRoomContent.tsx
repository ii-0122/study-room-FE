import StudyProfileBox from '@/components/studyProfileBox/StudyProfileBox';
import React, { useEffect, useRef, useState } from 'react';
import * as S from './StudyRoomContent.style';
import { useNavigate } from 'react-router-dom';
import StartPauseButton from '../../privateStudyRoom/components/button/StartPauseButton';
import LeaveButton from '../../privateStudyRoom/components/button/LeaveButton';
import RSidebar from '@/components/rsidebar/RSidebar';
import { useSocket } from '@/socket/SocketContext';
import { StudyRoomInfo, TimerInfo, TodoTimer } from '@/models/studyRoom.model';
import Header from '@/components/header/Header';
import { dataTagSymbol } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth.store';
import useStudyRoomStore from '@/stores/studyRoom.store';

const MultiStudyRoom = () => {
  const navigate = useNavigate();
  // zustand state 연결
  const user = useAuthStore((state) => state.user);
  const selectedTodo = useStudyRoomStore((state) => state.selectedTodo);
  const todos = useStudyRoomStore((state) => state.todos);
  const updateTodos = useStudyRoomStore((state) => state.updateTodos);

  // 내 유저 정보 state
  const imgUrl =
    'https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg';
  const [studyRoomInfo, setStudyRoomInfo] = useState<StudyRoomInfo>();
  const [myTimerInfo, setMyTimerInfo] = useState<TimerInfo | undefined>(
    undefined
  );
  const initInfo = {
    nickname: '',
    imageUrl: '',
    totalTime: 0,
    timer: '00:00:00',
    state: 'stop',
  };

  // 내 타이머 정보 state
  const [currentTaskTime, setCurrentTaskTime] = useState<string>('00:00:00');
  const [todosTimer, setTodosTimer] = useState<TodoTimer[]>([]);
  const [usersTimerInfo, setUsersTimerInfo] = useState<TimerInfo[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const numberToTimer = (totalTime: number) => {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60; // 초 계산

    const formattedTime = [
      String(hours).padStart(2, '0'), // 시간
      String(minutes).padStart(2, '0'), // 분
      String(seconds).padStart(2, '0'), // 초
    ].join(':');

    return formattedTime;
  };

  const timerToNumber = (timer: string) => {
    const timeParts = timer.split(':');
    if (timeParts.length !== 3) {
      return 0;
    }

    const hours = parseInt(timeParts[0], 10) || 0; // 시
    const minutes = parseInt(timeParts[1], 10) || 0; // 분
    const seconds = parseInt(timeParts[2], 10) || 0; // 초

    // 초 단위로 변환
    return hours * 3600 + minutes * 60 + seconds;
  };

  const updateMyTotalStudyTime = () => {
    setMyTimerInfo((prevInfo: TimerInfo | undefined) => {
      const currentInfo = prevInfo || initInfo;
      const newTotalTime = currentInfo.totalTime + 1;
      return {
        ...currentInfo,
        totalTime: newTotalTime,
        timer: numberToTimer(newTotalTime),
      };
    });
  };

  const updateMyTimers = () => {
    // 현재 선택된 할 일 타이머 증가
    //setCurrentTaskTime();

    // 총 공부 시간 증가
    updateMyTotalStudyTime();
  };

  const updateOthersTimer = () => {};

  // 타이머 초 증가
  useEffect(() => {
    if (myTimerInfo?.state === 'start') {
      intervalRef.current = setInterval(updateMyTimers, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [myTimerInfo?.state]);

  const handleStartPause = () => {
    if (myTimerInfo?.state === 'stop') {
      if (selectedTodo !== null) {
        const payload = {
          plannerId: selectedTodo?._id,
          currentTime: Date.now(),
          totalTime: currentTaskTime,
        };

        console.log('시작 버튼 클릭');
        setMyTimerInfo((prevInfo: TimerInfo | undefined) => {
          const currentInfo = prevInfo || initInfo;
          return { ...currentInfo, state: 'start' };
        });
        socket?.emit('start', payload);
      } else {
        alert(
          '시작 버튼을 클릭할 수 없습니다.\n 타이머를 시작하려면 할 일을 클릭해주세요'
        );
      }
    } else if (myTimerInfo?.state === 'start') {
      if (selectedTodo !== null) {
        const payload = {
          plannerId: selectedTodo?._id,
          currentTime: Date.now(),
          totalTime: timerToNumber(currentTaskTime) * 1000,
        };
        console.log('일시 정지 버튼 클릭');
        setMyTimerInfo((prevInfo: TimerInfo | undefined) => {
          const currentInfo = prevInfo || initInfo;
          return { ...currentInfo, state: 'stop' };
        });
        const updateTodo = {
          ...selectedTodo,
          totalTime: timerToNumber(currentTaskTime) * 1000,
        };
        console.log(updateTodo);
        updateTodos(updateTodo);
        socket?.emit('stop', payload);
      }
    }
  };
  // socket
  const socket = useSocket();
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.connect();

    socket.on('getRoomAndMyInfo', (data) => {
      // 첫 소켓 접속 시
      console.log(data);
      setStudyRoomInfo(data); // 스터디 방 정보 저장
      const userData = {
        nickname: user?.nickname ? user.nickname : '',
        imageUrl: imgUrl,
        totalTime: data.totalTime,
        timer: numberToTimer(data.totalTime),
        state: 'stop',
      };
      setMyTimerInfo(userData);
    });

    return () => {
      socket.disconnect();
      socket.off('getRoomAndMyInfo');
    };
  }, [socket, user]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('addMemberAndRequestUserInfo', (data) => {
      console.log(data);
      socket.emit('responseUserInfo', data);
    });

    socket.on('responseUserInfo', (data) => {
      console.log(data);
      const userData = {
        ...data,
        timer: numberToTimer(data.totalTime),
      };
      setUsersTimerInfo((prevUsers) => [...prevUsers, userData]);
    });

    return () => {
      socket.off('addMemberAndRequestUserInfo');
      socket.off('responseUserInfo');
    };
  }, [socket, user, myTimerInfo]);

  useEffect(() => {
    console.log(selectedTodo);
  }, [selectedTodo]);

  const handleLeaveRoom = () => {
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
              userId={myTimerInfo?.nickname}
              initialCurrentTaskTime={'00:00:00'}
              initialTotalStudyTime={myTimerInfo?.timer}
              profileImage={myTimerInfo?.imageUrl}
              profileImageWidth="120px"
              profileImageHeight="120px"
            />
            {usersTimerInfo
              ? usersTimerInfo.map((data) => (
                  <StudyProfileBox
                    isGroup={true}
                    userId={data.nickname}
                    initialCurrentTaskTime={'00:00:00'}
                    initialTotalStudyTime={'00:00:00'}
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
            <StartPauseButton
              isActive={myTimerInfo?.state === 'start'}
              onClick={handleStartPause}
            />
            <LeaveButton onClick={handleLeaveRoom} />
          </S.ButtonContainer>
        </S.StudyRoomWrap>
      </S.MainContentArea>
      <RSidebar />
    </S.MultiStudyRoomStyle>
  );
};

export default MultiStudyRoom;
