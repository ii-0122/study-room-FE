import StudyProfileBox from '@/components/studyProfileBox/StudyProfileBox';
import React, { useEffect, useRef, useState } from 'react';
import StartPauseButton from '../components/button/StartPauseButton';
import { useNavigate } from 'react-router-dom';
import LeaveButton from '../components/button/LeaveButton';
import * as S from './PrivateStudyRoomContentStyle';
import Header from '@/components/header/Header';
import RSidebar from '@/components/rsidebar/RSidebar';
import { useSocket } from '@/socket/SocketContext';
import {
  CurrentTodoTimer,
  StudyRoomInfo,
  TimerInfo,
} from '@/models/studyRoom.model';
import { useAuthStore } from '@/stores/auth.store';
import useStudyRoomStore from '@/stores/studyRoom.store';
import { ServerToClientPlanner } from '@/models/studyRoomTodos.model';

const PrivateStudyRoomContent = () => {
  const navigate = useNavigate();

  // zustand state 연결
  const user = useAuthStore((state) => state.user);
  const selectedTodo = useStudyRoomStore((state) => state.selectedTodo);
  const previousTodo = useRef<ServerToClientPlanner | null>(null);
  // const todos = useStudyRoomStore((state) => state.todos);
  const setSelectedTodo = useStudyRoomStore((state) => state.setSelectedTodo);
  const updateTodos = useStudyRoomStore((state) => state.updateTodos);

  // 내 유저 정보 state
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
  const [currentTaskTime, setCurrentTaskTime] = useState<CurrentTodoTimer>({
    totalTime: 0,
    timer: '00:00:00',
  });
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

  const updateMyCurrentStudyTime = () => {
    setCurrentTaskTime((prevInfo: CurrentTodoTimer) => {
      const newTotalTime = prevInfo.totalTime + 1;
      return {
        totalTime: newTotalTime,
        timer: numberToTimer(newTotalTime),
      };
    });
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
    updateMyCurrentStudyTime();
    updateMyTotalStudyTime();
  };

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
          totalTime: myTimerInfo.totalTime,
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
          totalTime: myTimerInfo.totalTime,
        };
        console.log('일시 정지 버튼 클릭');
        setMyTimerInfo((prevInfo: TimerInfo | undefined) => {
          const currentInfo = prevInfo || initInfo;
          return { ...currentInfo, state: 'stop' };
        });
        const updateTodo = {
          ...selectedTodo,
          totalTime: currentTaskTime.totalTime,
        };
        console.log(updateTodo);
        updateTodos(updateTodo);
        setSelectedTodo(updateTodo);
        socket?.emit('stop', payload);
      }
    }
  };

  // selectedTodo 변화에 따른 이벤트
  useEffect(() => {
    // 선택된 할 일 타이머 설정
    const currentTaskTotalTime = selectedTodo?.totalTime
      ? selectedTodo.totalTime
      : 0;
    const taskTime = {
      totalTime: currentTaskTotalTime,
      timer: numberToTimer(currentTaskTotalTime),
    };
    setCurrentTaskTime(taskTime);

    // 이벤트 1) state: 'stop', selectedTodo: a -> b
    if (
      myTimerInfo?.state === 'stop' &&
      selectedTodo?._id !== previousTodo.current?._id
    ) {
      console.log(`타이머 start`);
      setMyTimerInfo((prevInfo: TimerInfo | undefined) => {
        const currentInfo = prevInfo || initInfo;
        return { ...currentInfo, state: 'start' };
      });

      const payload = {
        plannerId: selectedTodo?._id,
        currentTime: Date.now(),
        totalTime: myTimerInfo.totalTime,
      };
      socket?.emit('start', payload);
    }

    // 이벤트 2) state : 'start'일 때 selectedTodo: a -> b
    if (
      myTimerInfo?.state === 'start' &&
      selectedTodo?._id !== previousTodo.current?._id
    ) {
      if (previousTodo.current) {
        const prevTodoTimer = {
          ...previousTodo.current,
          totalTime: currentTaskTime.totalTime,
        };
        updateTodos(prevTodoTimer);
      }

      const payload = {
        plannerId: selectedTodo?._id,
        currentTime: Date.now(),
        totalTime: myTimerInfo.totalTime,
      };
      socket?.emit('change', payload);
    }

    previousTodo.current = selectedTodo;
  }, [selectedTodo]);

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
        imageUrl: user?.imageUrl ? user.imageUrl : '',
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

  const handleLeaveRoom = () => {
    navigate('/study-rooms');
  };

  return (
    <S.PrivateStudyRoomStyle>
      <S.MainContentArea>
        <Header
          title={studyRoomInfo ? studyRoomInfo.title : '[개인] 스터디 룸'}
        />
        <S.StudyRoomWrap>
          <StudyProfileBox
            isGroup={false}
            userId={myTimerInfo?.nickname}
            initialCurrentTaskTime={currentTaskTime.timer}
            initialTotalStudyTime={myTimerInfo?.timer}
            profileImage={myTimerInfo?.imageUrl}
            profileImageWidth="400px"
            profileImageHeight="400px"
          />
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
    </S.PrivateStudyRoomStyle>
  );
};

export default PrivateStudyRoomContent;
