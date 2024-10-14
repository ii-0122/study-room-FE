import { useInfiniteQuery } from '@tanstack/react-query';
import StudyItem from './StudyItem';
import { FetchRoomsParams, Room } from '@/types/studyRoom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/modal/Modal';
import PasswordInput from '../form/PasswordInput';
import * as S from './StudyGrid.style';
import { checkStudyRoomPassword, fetchRooms } from '@/apis/studyRooms.api';
import Loader from '@/components/loader/Loader';

interface ResData {
  rooms: Room[];
  offset: number;
  hasMore: boolean;
}

function StudyGrid({
  filter,
}: {
  filter: { isPublic?: boolean; isPossible?: boolean; search?: string };
}) {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [password, setPassword] = useState('');
  const gridContainerWidthRef = useRef<HTMLDivElement>(null);
  const lastRoomRef = useRef<HTMLDivElement | null>(null);
  const [limitByWidth, setLimitByWidth] = useState(0);
  const LIMIT_ROWS = 3;
  const params: Omit<FetchRoomsParams, 'limit'> = {
    search: filter.search || '',
    isPublic: filter.isPublic,
    isPossible: filter.isPossible,
  };

  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery<ResData, Error>({
      queryKey: ['rooms', params],
      queryFn: ({ pageParam }) =>
        fetchRooms({ ...params, limit: limitByWidth }, pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasMore) {
          return undefined;
        }
        return lastPage.offset;
      },

      enabled: !!gridContainerWidthRef.current,
    });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    const currentRef = lastRoomRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [data, limitByWidth, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (gridContainerWidthRef.current) {
        const width = gridContainerWidthRef.current.offsetWidth - 25 + 30; // 25: padding 값, 30 : 스크롤바 총 영역 값
        const limit = Math.floor(width / (250 + 30)); // gridcell min값 + gap값

        if (limit < 1) {
          setLimitByWidth(1 * LIMIT_ROWS);
        } else {
          setLimitByWidth(limit * LIMIT_ROWS);
        }
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  const handleRoomClick = (room: Room) => {
    if (room.isPublic) {
      if (room.maxNum === 1) {
        navigate(`/study-room/${room._id}`);
      } else if (room.maxNum > 1) {
        navigate(`/multi-study-room/${room._id}`);
      }
    } else {
      setSelectedRoom(room);
      setShowPasswordModal(true);
    }
  };

  // 비밀번호 일치할 경우 : 비밀번호 확인 완료 message 받음
  const handlePasswordSubmit = async () => {
    if (selectedRoom) {
      try {
        const response = await checkStudyRoomPassword(
          selectedRoom._id,
          password
        );
        if (response.message === '비밀번호 확인 완료') {
          navigate(`/study-room/${selectedRoom._id}`);
        } else {
          alert('비밀번호가 일치하지 않습니다.');
        }
      } catch (error) {
        console.error('비밀번호 확인 중 오류 발생:', error);
        alert('비밀번호 확인 중 오류가 발생했습니다.');
      }
      setShowPasswordModal(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <S.ErrorMessage>{`방 목록을 불러오는 데 실패했습니다: ${error.message}`}</S.ErrorMessage>
      ) : data?.pages[0].rooms.length === 0 ? (
        <S.NoData>검색 결과가 없습니다.</S.NoData>
      ) : (
        <S.StudyGridItem ref={gridContainerWidthRef}>
          {data?.pages.map(({ rooms }) => {
            return rooms.map((room, index) => {
              const isLastRoom = index === rooms.length - 1;
              return (
                <div
                  key={room._id}
                  onClick={() => handleRoomClick(room)}
                  ref={isLastRoom ? lastRoomRef : null}
                >
                  <StudyItem
                    key={room._id}
                    title={room.title}
                    imageUrl={room.imageUrl}
                    tagList={room.tagList}
                    isPublic={room.isPublic}
                    maxNum={room.maxNum}
                    currentNum={room.currentNum}
                  />
                </div>
              );
            });
          })}
        </S.StudyGridItem>
      )}
      {showPasswordModal && selectedRoom && (
        <Modal onClose={() => setShowPasswordModal(false)}>
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            onSubmit={handlePasswordSubmit}
          />
        </Modal>
      )}
    </>
  );
}

export default StudyGrid;
