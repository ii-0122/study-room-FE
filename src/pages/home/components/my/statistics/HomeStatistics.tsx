import { useEffect, useState } from 'react';
import * as S from './HomeStatistics.style';
import MyTinyBarChart from './MyTinyBarChart';
import { fetchAllGraph } from '@/apis/statistics.api';

function HomeStatistics() {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllGraph(0);
        const formattedData = data.my.dailyAverage.map(
          (item: { date: string; totalTime: number }) => ({
            date: item.date,
            totalTime: item.totalTime,
          })
        );
        setMyData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
    console.log(myData);
  }, []);

  return (
    <S.HomeStatisticsStyle>
      <S.Title>일주일간 총 공부 시간</S.Title>
      <S.Graph>
        <MyTinyBarChart myData={myData} />
      </S.Graph>
    </S.HomeStatisticsStyle>
  );
}

export default HomeStatistics;
