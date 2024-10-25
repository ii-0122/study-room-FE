import { useEffect, useState } from 'react';
import * as S from '@/pages/statistics/all/AllStatisticsPage.style';
import { fetchAllAverage } from '@/apis/statistics.api';
import { formatAverageTime } from '@/utils/formatTime';
import MyLineChart from './components/myLineChart/MyLineChart';
import { useAuthStore } from '@/stores/auth.store';

interface AverageSection {
  title: string;
  average: {
    yesterday: { hours: string; minutes: string };
    lastWeek: { hours: string; minutes: string };
    lastMonth: { hours: string; minutes: string };
  };
}

const AverageSection = ({ title, average }: AverageSection) => (
  <S.Avg>
    <S.AvgTitle>{title}</S.AvgTitle>
    <div>
      <S.AvgLine>
        전날 평균
        <S.AvgSpan>
          {formatAverageTime(
            average.yesterday.hours,
            average.yesterday.minutes
          )}
        </S.AvgSpan>
      </S.AvgLine>
      <S.AvgLine>
        저번 주 평균
        <S.AvgSpan>
          {formatAverageTime(average.lastWeek.hours, average.lastWeek.minutes)}
        </S.AvgSpan>
      </S.AvgLine>
      <S.AvgLine>
        저번 달 평균
        <S.AvgSpan>
          {formatAverageTime(
            average.lastMonth.hours,
            average.lastMonth.minutes
          )}
        </S.AvgSpan>
      </S.AvgLine>
    </div>
  </S.Avg>
);

export default function AllStatisticsPage() {
  const { user } = useAuthStore();
  const [averageData, setAverageData] = useState({
    all: {
      yesterday: { hours: '', minutes: '' },
      lastWeek: { hours: '', minutes: '' },
      lastMonth: { hours: '', minutes: '' },
    },
    my: {
      yesterday: { hours: '', minutes: '' },
      lastWeek: { hours: '', minutes: '' },
      lastMonth: { hours: '', minutes: '' },
    },
  });

  const loadAverageData = async () => {
    try {
      const data = await fetchAllAverage();
      setAverageData(data);
    } catch (error) {
      console.error('평균 데이터 가져오는 중 오류', error);
    }
  };

  useEffect(() => {
    loadAverageData();
  }, []);

  return (
    <S.StatContainer>
      <div>
        <S.AvgWrapper>
          <AverageSection title="전체 사용자" average={averageData.all} />
          <AverageSection
            title={`${user?.nickname}`}
            average={averageData.my}
          />
        </S.AvgWrapper>
      </div>
      <MyLineChart />
    </S.StatContainer>
  );
}
