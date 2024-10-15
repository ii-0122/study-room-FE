import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import * as S from '@/pages/statistics/my/components/myPieChart/MyPieChart.style';
import { fetchDailyData } from '@/apis/statistics.api';
import { useEffect, useState } from 'react';

const COLORS = ['#00A9FF', '#89CFF3', '#A0E9FF', '#CDF5FD'];

interface MyPieChartProps {
  selectedDate: Date | null;
}

export default function MyPieChart({ selectedDate }: MyPieChartProps) {
  const [dailyData, setDailyData] = useState({
    totalTime: '00:00:00',
    maxTime: '00:00:00',
    restTime: '00:00:00',
    planner: [{ todo: '', totalTime: '00:00', percentage: 0 }],
  });

  const loadDailyData = async (year: number, month: number, day: number) => {
    try {
      const params = {
        year,
        month: month.toString().padStart(2, '0'),
        day: day.toString().padStart(2, '0'),
      };
      const data = await fetchDailyData(params);
      setDailyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const dateToFetch = new Date();
    const year = dateToFetch.getFullYear();
    const month = dateToFetch.getMonth() + 1;
    const day = dateToFetch.getDate();
    loadDailyData(year, month, day);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      loadDailyData(year, month, day);
    }
  }, [selectedDate]);

  const renderLabel = () => {
    return (
      <>
        <text x="50%" y="50%" textAnchor="middle" fontSize="16">
          총 공부 시간
        </text>
        <text
          x="50%"
          y="50%"
          dy="16"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {dailyData.totalTime}
        </text>
      </>
    );
  };

  interface CustomTooltip {
    active: boolean;
    payload: Array<{ payload: { todo: string }; value: number }>;
  }

  const CustomTooltip = ({ active, payload }: CustomTooltip) => {
    if (active && payload && payload.length) {
      const todo = payload[0].payload.todo;

      return (
        <S.TooltipContainer>
          <S.TaskText>{`${todo}`}</S.TaskText>
          <S.TimeText>{`${payload[0].value} %`}</S.TimeText>
        </S.TooltipContainer>
      );
    }

    return null;
  };

  return (
    <S.ChartWrapper>
      {dailyData.totalTime === '00:00:00' ? (
        <S.EmptyText>
          할 일을 시작해보세요. <br />
          아직 기록된 시간이 없습니다!
        </S.EmptyText>
      ) : (
        <>
          <PieChart width={250} height={250}>
            <Pie
              data={dailyData.planner}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              fill="#8884d8"
              dataKey="percentage"
              labelLine={false}
              label={renderLabel}
            >
              {dailyData.planner.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
          </PieChart>
          <S.ValueContainer>
            <S.ValueWrapper>
              <S.ValueTitle>최대 집중 시간</S.ValueTitle>
              <S.ValueText>{dailyData.maxTime}</S.ValueText>
            </S.ValueWrapper>
            <S.ValueWrapper>
              <S.ValueTitle>휴식 시간</S.ValueTitle>
              <S.ValueText>{dailyData.restTime}</S.ValueText>
            </S.ValueWrapper>
          </S.ValueContainer>
        </>
      )}
    </S.ChartWrapper>
  );
}
