import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import MyBarChart from './components/myBarChart/MyBarChart';
import MyCalendar from './components/myCalendar/MyCalendar';
import MyPieChart from './components/myPieChart/MyPieChart';
import * as S from '@/pages/statistics/my/MyStatisticsPage.style';
import { fetchMonthlyData, fetchWeeklyData } from '@/apis/statistics.api';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function MyStatisticsPage() {
  const [viewMode, setViewMode] = useState<'일간' | '주간' | '월간'>('일간');
  const [activeButton, setActiveButton] = useState<'일간' | '주간' | '월간'>(
    '일간'
  );
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [weeklyOffset, setWeeklyOffset] = useState(1);
  const [monthlyOffset, setMonthlyOffset] = useState(0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Add state for selected date

  useEffect(() => {
    const fetchData = async () => {
      if (viewMode === '주간') {
        const data = await fetchWeeklyData(weeklyOffset);
        setWeeklyData(data);
      } else if (viewMode === '월간') {
        const data = await fetchMonthlyData(monthlyOffset);
        setMonthlyData(data);
      }
    };

    fetchData();
  }, [viewMode, weeklyOffset, monthlyOffset]);

  const getWeekRange = () => {
    const startOfWeek = dayjs().subtract(weeklyOffset, 'week').startOf('week');
    const endOfWeek = dayjs().subtract(weeklyOffset, 'week').endOf('week');
    return `${startOfWeek.format('MM월 DD일')} - ${endOfWeek.format('MM월 DD일')}`;
  };

  const getMonthLabel = () => {
    return dayjs().subtract(monthlyOffset, 'month').format('MM월');
  };

  const handlePrev = () => {
    if (viewMode === '주간') {
      setWeeklyOffset(weeklyOffset + 1);
    } else if (viewMode === '월간') {
      setMonthlyOffset(monthlyOffset + 1);
    }
  };

  const handleNext = () => {
    if (viewMode === '주간' && weeklyOffset > 0) {
      setWeeklyOffset(weeklyOffset - 1);
    } else if (viewMode === '월간' && monthlyOffset > 0) {
      setMonthlyOffset(monthlyOffset - 1);
    }
  };

  const handleDateClick = (date: Date) => {
    dayjs(date).format('YYYY-MM-DD');
    setSelectedDate(date);
  };

  const renderChart = () => {
    switch (viewMode) {
      case '주간':
        return weeklyData ? (
          <MyBarChart data={weeklyData} />
        ) : (
          <div>주간 통계 데이터가 없습니다.</div>
        );
      case '월간':
        return monthlyData ? (
          <MyBarChart data={monthlyData} />
        ) : (
          <div>월간 통계 데이터가 없습니다.</div>
        );
      case '일간':
      default:
        return <MyPieChart selectedDate={selectedDate} />;
    }
  };

  const getTitle = () => {
    switch (viewMode) {
      case '주간':
        return getWeekRange();
      case '월간':
        return getMonthLabel();
      case '일간':
      default:
        return '할 일 통계';
    }
  };

  const handleButton = (mode: '일간' | '주간' | '월간') => {
    setViewMode(mode);
    setActiveButton(mode);
  };

  return (
    <S.StatContainer>
      <MyCalendar onDateClick={handleDateClick} />
      <S.StatWrapper>
        <S.ButtonWrapper>
          <S.Button
            onClick={() => handleButton('일간')}
            $isActive={activeButton === '일간'}
          >
            일간
          </S.Button>
          <S.Button
            onClick={() => handleButton('주간')}
            $isActive={activeButton === '주간'}
          >
            주간
          </S.Button>
          <S.Button
            onClick={() => handleButton('월간')}
            $isActive={activeButton === '월간'}
          >
            월간
          </S.Button>
        </S.ButtonWrapper>
        <S.ChartWrapper>
          <S.ChartTitle>
            {viewMode !== '일간' && (
              <>
                <S.ArrowButton>
                  <IoIosArrowBack onClick={handlePrev} />
                </S.ArrowButton>
                {getTitle()}
                <S.ArrowButton>
                  <IoIosArrowForward onClick={handleNext} />
                </S.ArrowButton>
              </>
            )}
            {viewMode === '일간' && <>{getTitle()}</>}
          </S.ChartTitle>
          {renderChart()}
        </S.ChartWrapper>
      </S.StatWrapper>
    </S.StatContainer>
  );
}
