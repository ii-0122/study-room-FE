import { useEffect, useState } from 'react';
import StudyItem from './StudyItem';
import * as S from './StudyGrid.style';

const dummyData = [
  {
    title: '스터디방 1',
    imageUrl: 'https://via.placeholder.com/328x207',
    hashtags: ['프로그래밍', '자바스크립트'],
    isPublic: false,
    maxParticipants: 15,
    currentParticipants: 4,
  },
  {
    title: '스터디방 2',
    imageUrl: 'https://via.placeholder.com/328x207',
    hashtags: ['리엑트', '웹개발'],
    isPublic: true,
    maxParticipants: 10,
    currentParticipants: 2,
  },
  {
    title: '스터디방 3',
    imageUrl: undefined,
    hashtags: ['리엑트', '웹개발'],
    isPublic: true,
    maxParticipants: 15,
    currentParticipants: 15,
  },
  {
    title: '스터디방 4',
    imageUrl: undefined,
    hashtags: undefined,
    isPublic: false,
    maxParticipants: 2,
    currentParticipants: 1,
  },
  {
    title: '스터디방 5',
    imageUrl: 'https://via.placeholder.com/328x207',
    hashtags: ['프로그래밍', '자바스크립트'],
    isPublic: true,
    maxParticipants: 15,
    currentParticipants: 4,
  },
  {
    title: '스터디방 6',
    imageUrl: 'https://via.placeholder.com/328x207',
    hashtags: ['리엑트', '웹개발'],
    isPublic: true,
    maxParticipants: 10,
    currentParticipants: 2,
  },
  {
    title: '스터디방 7',
    imageUrl: undefined,
    hashtags: ['리엑트', '웹개발'],
    isPublic: true,
    maxParticipants: 15,
    currentParticipants: 15,
  },
  {
    title: '스터디방 8',
    imageUrl: undefined,
    hashtags: undefined,
    isPublic: true,
    maxParticipants: 2,
    currentParticipants: 1,
  },
  {
    title: '스터디방 9',
    imageUrl: 'https://via.placeholder.com/328x207',
    hashtags: ['프로그래밍', '자바스크립트'],
    isPublic: false,
    maxParticipants: 15,
    currentParticipants: 4,
  },
  {
    title: '스터디방 10',
    imageUrl: 'https://via.placeholder.com/328x207',
    hashtags: ['리엑트', '웹개발'],
    isPublic: true,
    maxParticipants: 10,
    currentParticipants: 2,
  },
  {
    title: '스터디방 11',
    imageUrl: undefined,
    hashtags: ['리엑트', '웹개발'],
    isPublic: true,
    maxParticipants: 15,
    currentParticipants: 15,
  },
  {
    title: '스터디방 12',
    imageUrl: undefined,
    hashtags: undefined,
    isPublic: false,
    maxParticipants: 2,
    currentParticipants: 1,
  },
  {
    title: '스터디방 13',
    imageUrl: 'https://via.placeholder.com/328x207',
    hashtags: ['프로그래밍', '자바스크립트'],
    isPublic: true,
    maxParticipants: 15,
    currentParticipants: 4,
  },
  {
    title: '스터디방 14',
    imageUrl: 'https://via.placeholder.com/328x207',
    hashtags: ['리엑트', '웹개발'],
    isPublic: true,
    maxParticipants: 10,
    currentParticipants: 2,
  },
  {
    title: '스터디방 15',
    imageUrl: undefined,
    hashtags: ['리엑트', '웹개발'],
    isPublic: true,
    maxParticipants: 15,
    currentParticipants: 15,
  },
  {
    title: '스터디방 16',
    imageUrl: undefined,
    hashtags: undefined,
    isPublic: true,
    maxParticipants: 2,
    currentParticipants: 1,
  },
];

function StudyGrid() {
  const [studies, setStudies] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  // 스크롤 시 데이터 추가 로드
  useEffect(() => {
    const handleScroll = () => {
      const gridElement = document.getElementById('scrollable-grid');
      if (
        gridElement &&
        gridElement.scrollTop + gridElement.clientHeight + 50 >
          gridElement.scrollHeight
      ) {
        if (!isLoading) {
          setIsLoading(true);
          // 데이터 추가 로드 시뮬
          setTimeout(() => {
            setStudies((prevStudies) => [...prevStudies]);
            setIsLoading(false);
          }, 1000);
        }
      }
    };

    const gridElement = document.getElementById('scrollable-grid');
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading]);

  return (
    <S.ScrollContainer>
      <S.StudyGridStyle id="scrollable-grid">
        {studies.map((study, index) => (
          <StudyItem
            key={index}
            title={study.title}
            imageUrl={study.imageUrl}
            hashtags={study.hashtags}
            isPublic={study.isPublic}
            maxParticipants={study.maxParticipants}
            currentParticipants={study.currentParticipants}
          />
        ))}
      </S.StudyGridStyle>
    </S.ScrollContainer>
  );
}

export default StudyGrid;
