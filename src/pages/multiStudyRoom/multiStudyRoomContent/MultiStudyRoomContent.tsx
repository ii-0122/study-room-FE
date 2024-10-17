import StudyProfileBox from '@/components/studyProfileBox/StudyProfileBox';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './MultiStudyRoomContent.style';
import { useNavigate } from 'react-router-dom';
import StartPauseButton from '../../privateStudyRoom/components/button/StartPauseButton';
import LeaveButton from '../../privateStudyRoom/components/button/LeaveButton';
import RSidebar from '@/components/rsidebar/RSidebar';
import { useSocket } from '@/socket/SocketContext';
import {
  CurrentTodoTimer,
  ModifiedRoomInfo,
  StudyRoomInfo,
  SubMember,
  TimerInfo,
} from '@/models/studyRoom.model';
import Header from '@/components/header/Header';
import { useAuthStore } from '@/stores/auth.store';
import useStudyRoomStore from '@/stores/studyRoom.store';
import { throttle } from 'lodash';
import {
  ServerToClientPlanner,
  UserStateRes,
} from '@/models/studyRoomTodos.model';
import StudyRoomNotice from '../component/StudyRoomNotice';
import { IoSettingsOutline } from 'react-icons/io5';
import Modal from '@/components/modal/Modal';
import UpdateStudyRoomForm from '../component/updateStudyRoomForm/UpdateStudyRoomForm';

const MultiStudyRoomContent = () => {
  const navigate = useNavigate();

  // zustand state 연결
  const user = useAuthStore((state) => state.user);
  const selectedTodo = useStudyRoomStore((state) => state.selectedTodo);
  const previousTodo = useRef<ServerToClientPlanner | null>(null);
  const setSelectedTodo = useStudyRoomStore((state) => state.setSelectedTodo);
  const updateTodos = useStudyRoomStore((state) => state.updateTodos);

  const initInfo = {
    nickname: '',
    imageUrl: '',
    totalTime: 0,
    timer: '00:00:00',
    state: 'stop',
  };

  const initStudyRoomInfo = {
    title: '',
    notice: '',
    password: '',
    tagList: [],
    maxNum: 0,
    isChat: true,
    isPublic: true,
    imageUrl: '',
    roomManager: '',
    currentMember: [],
    planner: [],
    totalTime: 0,
  };
  // 내 유저 정보 state
  const [studyRoomInfo, setStudyRoomInfo] =
    useState<StudyRoomInfo>(initStudyRoomInfo);
  const [myTimerInfo, setMyTimerInfo] = useState<TimerInfo | undefined>(
    undefined
  );

  // 내 타이머 정보 state
  const [currentTaskTime, setCurrentTaskTime] = useState<CurrentTodoTimer>({
    totalTime: 0,
    timer: '00:00:00',
  });
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

  const updateOthersTimer = useCallback(() => {
    setUsersTimerInfo((prevUsers) =>
      prevUsers.map((user) => {
        if (user.state === 'start') {
          return {
            ...user,
            totalTime: user.totalTime + 1,
            timer: numberToTimer(user.totalTime + 1),
          };
        }
        return user; // 'stop'일 경우 변경하지 않음
      })
    );
  }, []);

  const updateUserState = (data: UserStateRes) => {
    console.log(numberToTimer(data.totalTime));
    setUsersTimerInfo((prevUsers) =>
      prevUsers.map((user) => {
        if (user.nickname === data.nickname) {
          return {
            ...user,
            state: data.state === 'stop' ? 'stop' : 'start',
            totalTime: data.totalTime,
            timer: numberToTimer(data.totalTime),
          };
        }
        return user; // 조건에 맞지 않으면 기존 사용자 반환
      })
    );
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

  // 다른 유저의 타이머 start, stop 관리
  useEffect(() => {
    if (!usersTimerInfo) {
      return;
    }

    const intervalId = setInterval(updateOthersTimer, 1000);

    return () => clearInterval(intervalId);
  }, [updateOthersTimer]);

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

    socket.on('modifiedRoomInfo', (data: ModifiedRoomInfo) => {
      setStudyRoomInfo((prevInfo: StudyRoomInfo | undefined) => {
        const prevData = prevInfo || initStudyRoomInfo;
        const newData: StudyRoomInfo = {
          ...data,
          currentMember: prevData.currentMember,
          planner: prevData.planner,
          totalTime: prevData.totalTime,
        };
        return newData;
      });
    });

    return () => {
      socket.disconnect();
      socket.off('getRoomAndMyInfo');
      socket.off('modifiedRoomInfo');
    };
  }, [socket, user]);

  // 유저 입장 및 타이머 정보 응답
  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleAddMemberAndRequestUserInfo = throttle((data) => {
      console.log(data);
      const userData = {
        ...data,
        timer: numberToTimer(data.totalTime),
      };
      setUsersTimerInfo((prevUsers) => [...prevUsers, userData]);

      const payload = {
        socketId: data.socketId,
        totalTime: myTimerInfo?.totalTime,
        state: myTimerInfo?.state,
      };
      socket.emit('responseUserInfo', payload);
    }, 100);

    const handleResponseUserInfo = throttle((data) => {
      console.log(data);
      const userData = {
        ...data,
        timer: numberToTimer(data.totalTime),
      };
      setUsersTimerInfo((prevUsers) => [...prevUsers, userData]);
    }, 100);

    socket.on('addMemberAndRequestUserInfo', handleAddMemberAndRequestUserInfo);
    socket.on('responseUserInfo', handleResponseUserInfo);
    socket.on('updateUserState', (data) => {
      console.log(data);
      updateUserState(data);
    });
    socket.on('subMember', (data: SubMember) => {
      const disconnectedUserNickname = data.nickname;
      console.log(data);
      setUsersTimerInfo((prevUsers) =>
        prevUsers.filter((user) => user.nickname !== disconnectedUserNickname)
      );
      setStudyRoomInfo((prevInfo: StudyRoomInfo | undefined) => {
        const prevData = prevInfo || initStudyRoomInfo;
        const test = {
          ...prevData,
          roomManager: data.nickname,
        };
        return test;
      });
    });

    return () => {
      socket.off('addMemberAndRequestUserInfo');
      socket.off('responseUserInfo');
      socket.off('updateUserState');
      socket.off('subMember');
    };
  }, [socket, user, myTimerInfo]);

  const handleLeaveRoom = () => {
    navigate('/study-rooms');
  };

  const settingModal = useStudyRoomStore((state) => state.settingModal);
  const toggleSettingModal = useStudyRoomStore(
    (state) => state.toggleSettingModal
  );

  return (
    <S.MultiStudyRoomContentStyle>
      <S.MainContentArea>
        <Header
          title={studyRoomInfo ? studyRoomInfo.title : '[그룹] 스터디 룸'}
        />
        {studyRoomInfo?.notice === '' ? null : (
          <StudyRoomNotice allInfo={studyRoomInfo} />
        )}
        {settingModal && (
          <Modal onClose={() => toggleSettingModal()}>
            <UpdateStudyRoomForm studyRoomInfo={studyRoomInfo} />
          </Modal>
        )}
        {studyRoomInfo?.roomManager === user?.nickname ? (
          <S.SettingIconWrapper>
            <IoSettingsOutline size={36} onClick={() => toggleSettingModal()} />
          </S.SettingIconWrapper>
        ) : null}
        <S.StudyRoomWrap>
          <S.UserProfileContainer>
            <StudyProfileBox
              isGroup={true}
              isMe={true}
              userId={myTimerInfo?.nickname}
              initialCurrentTaskTime={currentTaskTime.timer}
              initialTotalStudyTime={myTimerInfo?.timer}
              profileImage={myTimerInfo?.imageUrl}
              profileImageWidth="120px"
              profileImageHeight="120px"
              isManager={user?.nickname === studyRoomInfo?.roomManager}
            />
            {usersTimerInfo
              ? usersTimerInfo.map((data) => (
                  <StudyProfileBox
                    isGroup={true}
                    userId={data.nickname}
                    initialCurrentTaskTime={'00:00:00'}
                    initialTotalStudyTime={data.timer}
                    profileImage={data.imageUrl}
                    profileImageWidth="120px"
                    profileImageHeight="120px"
                    isManager={data.nickname === studyRoomInfo?.roomManager}
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
    </S.MultiStudyRoomContentStyle>
  );
};

export default MultiStudyRoomContent;
