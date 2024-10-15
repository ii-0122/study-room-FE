import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { fetchAllGraph } from '@/apis/statistics.api';
import * as S from '@/pages/statistics/all/components/myLineChart/MyLineChart.style';
import { formatHours, formatHoursAndMinutes } from '@/utils/formatTime';
import { useAuthStore } from '@/stores/auth.store';

const CustomLegend = () => (
  <S.LegendContainer>
    <S.LegendItem>
      <S.Line color="#599bfc" />
      나의 공부 시간
    </S.LegendItem>
    <S.LegendItem>
      <S.Line color="#599bfc" $dashed />
      나의 평균 공부 시간
    </S.LegendItem>
    <S.LegendItem>
      <S.Line color="#2cc194" />
      전체 사용자 공부 시간
    </S.LegendItem>
    <S.LegendItem>
      <S.Line color="#2cc194" $dashed />
      전체 사용자 평균 공부 시간
    </S.LegendItem>
  </S.LegendContainer>
);

export default function MyLineChart() {
  const [graphData, setGraphData] = useState([]);
  const [allTotalAverage, setAllTotalAverage] = useState(0);
  const [myTotalAverage, setMyTotalAverage] = useState(0);
  const [offset, setOffset] = useState(0);
  const { user } = useAuthStore();
  const userNicknameKey = user?.nickname
    ? user.nickname.replace(/\s+/g, '_')
    : 'anonymous';

  useEffect(() => {
    loadGraphData();
  }, [offset]);

  const handlePrev = () => {
    setOffset(offset + 1);
  };

  const handleNext = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const loadGraphData = async () => {
    try {
      const data = await fetchAllGraph(offset);
      const formattedData = data.all.dailyAverage.map(
        (
          item: {
            date: string | number | Date | dayjs.Dayjs | null | undefined;
            totalTime: number;
          },
          index: string | number
        ) => ({
          date: dayjs(item.date).format('MM/DD'),
          전체사용자: item.totalTime,
          [userNicknameKey]: data.my.dailyAverage[index]?.totalTime,
        })
      );
      setGraphData(formattedData);

      setAllTotalAverage(data.all.totalAverage);
      setMyTotalAverage(data.my.totalAverage);
    } catch (error) {
      console.error('그래프 데이터 가져오는 중 오류', error);
    }
  };

  return (
    <>
      <S.ArrowGraphContainer>
        <IoIosArrowBack onClick={handlePrev} />
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={graphData}>
            <XAxis dataKey="date" />
            <YAxis tickFormatter={formatHours} />
            <Tooltip
              formatter={(value) => formatHoursAndMinutes(value as number)}
            />
            <ReferenceLine
              y={allTotalAverage}
              format={formatHours(allTotalAverage)}
              stroke="#2cc194"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <ReferenceLine
              y={myTotalAverage}
              format={formatHours(myTotalAverage)}
              stroke="##599bfc"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="전체사용자"
              stroke="#2cc194"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={userNicknameKey}
              stroke="#599bfc"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <IoIosArrowForward onClick={handleNext} />
      </S.ArrowGraphContainer>
      <CustomLegend />
    </>
  );
}
