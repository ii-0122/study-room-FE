import { useQuery } from '@tanstack/react-query';
import StudyItem from './StudyItem';
import * as S from './StudyGrid.style';
import axios from 'axios';

interface Room {
  _id: string;
  title: string;
  tagList: string[];
  notice?: string;
  maxNum: number;
  isPublic: boolean;
  password?: string;
  isChat?: boolean;
  imageUrl?: string;
  roomManager: string;
  currentMembers: string[];
  createdAt: string;
  currentNum: number;
}

interface FetchRoomsParams {
  search?: string;
  isPublic?: boolean;
  isPossible?: boolean;
  limit?: number;
  offset?: number;
}

// API 요청 함수
const fetchRooms = async (params: FetchRoomsParams) => {
  const { search, isPublic, isPossible, limit, offset } = params;

  const query = new URLSearchParams({
    search: search || '',
    isPublic: isPublic !== undefined ? String(isPublic) : '',
    isPossible: isPossible !== undefined ? String(isPossible) : '',
    limit: limit !== undefined ? String(limit) : '',
    offset: offset !== undefined ? String(offset) : '',
  }).toString();

  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/rooms?${query}`;
  console.log('Fetching URL:', url);
  const res = await axios.get(url);
  return res.data;
};

function StudyGrid({
  filter,
}: {
  filter: { isPublic?: boolean; isPossible?: boolean; search?: string };
}) {
  const params: FetchRoomsParams = {
    search: filter.search || '',
    isPublic: filter.isPublic,
    isPossible: filter.isPossible,
    limit: 40,
    offset: 0, // 예시로 0으로 설정
  };

  const {
    data: rooms = [],
    isLoading,
    error,
  } = useQuery<Room[], Error>({
    queryKey: ['rooms', params],
    queryFn: () => fetchRooms(params),
  });

  return (
    <S.ScrollContainer>
      <S.StudyGridStyle id="scrollable-grid">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div>{`방 목록을 불러오는 데 실패했습니다: ${error.message}`}</div>
        ) : (
          rooms.map((room) => (
            <StudyItem
              key={room._id}
              title={room.title}
              imageUrl={room.imageUrl}
              tagList={room.tagList}
              isPublic={room.isPublic}
              maxNum={room.maxNum}
              currentNum={room.currentNum}
            />
          ))
        )}
      </S.StudyGridStyle>
    </S.ScrollContainer>
  );
}

export default StudyGrid;
