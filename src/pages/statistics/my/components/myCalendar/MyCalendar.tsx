import { useEffect, useState } from 'react';
import {
  Calendar,
  dayjsLocalizer,
  HeaderProps,
  ToolbarProps,
} from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import * as S from '@/pages/statistics/my/components/myCalendar/MyCalendar.style';
import { fetchCalendarData } from '@/apis/statistics.api';

const localizer = dayjsLocalizer(dayjs);

const getBackgroundColor = (time: number) => {
  if (time >= 480) return '#2A7029';
  if (time >= 360) return '#64A562';
  if (time >= 240) return '#80AF81';
  if (time >= 120) return '#AAD3AB';
  if (time >= 1) return '#D6EFD8';
  return 'white';
};

const Legend = () => {
  return (
    <S.Legend>
      <S.LegendItem $bgcolor="#D6EFD8">1분 이상</S.LegendItem>
      <S.LegendItem $bgcolor="#AAD3AB">2시간 이상</S.LegendItem>
      <S.LegendItem $bgcolor="#80AF81">4시간 이상</S.LegendItem>
      <S.LegendItem $bgcolor="#64A562">6시간 이상</S.LegendItem>
      <S.LegendItem $bgcolor="#2A7029">8시간 이상</S.LegendItem>
    </S.Legend>
  );
};

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const CustomHeader = (props: HeaderProps) => {
  const { date } = props;
  const dayOfWeek = dayjs(date).day();
  return <S.Header>{weekDays[dayOfWeek]}</S.Header>;
};

interface StudyData {
  date: string;
  totalTime: number;
}

const DateCellWrapper = () => {
  return <S.DateCellWrapper />;
};

export default function MyCalendar({
  onDateClick,
}: {
  onDateClick: (date: Date) => void;
}) {
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1); // 0부터 시작하므로 +1
  const [calendarData, setCalendarData] = useState([]);

  const loadCalendarData = async (year: number, month: number) => {
    try {
      const params = { year, month: month.toString().padStart(2, '0') };
      const data = await fetchCalendarData(params);
      setCalendarData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCalendarData(year, month);
  }, [year, month]);

  const CustomDateHeader = ({
    date,
    studyData,
    onDateClick,
  }: {
    date: Date;
    studyData: StudyData[];
    onDateClick: (date: Date) => void;
  }) => {
    const dateString = dayjs(date).format('YYYY-MM-DD');
    const studyItem = studyData.find((item) => item.date === dateString);
    const time = studyItem ? studyItem.totalTime : 0;
    const backgroundColor = getBackgroundColor(time);

    return (
      <S.DateHeaderButton
        $backgroundColor={backgroundColor}
        onClick={() => onDateClick(date)}
      >
        {dayjs(date).format('DD')}
      </S.DateHeaderButton>
    );
  };

  const CustomToolbar = (toolbar: ToolbarProps) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
      const prevMonth = dayjs(toolbar.date).subtract(1, 'month');
      setYear(prevMonth.year());
      setMonth(prevMonth.month() + 1);
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
      const nextMonth = dayjs(toolbar.date).add(1, 'month');
      setYear(nextMonth.year());
      setMonth(nextMonth.month() + 1);
    };

    return (
      <S.DateWrapper>
        <S.Year>{year}년</S.Year>
        <S.MonthWrapper>
          <S.ArrowButton>
            <IoIosArrowBack onClick={goToBack} />
          </S.ArrowButton>
          <S.Month>{month}월</S.Month>
          <S.ArrowButton>
            <IoIosArrowForward onClick={goToNext} />
          </S.ArrowButton>
        </S.MonthWrapper>
      </S.DateWrapper>
    );
  };

  return (
    <S.CalendarContainer>
      <S.CalendarWrapper>
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ width: 500, height: 450 }}
          components={{
            dateCellWrapper: DateCellWrapper,
            toolbar: CustomToolbar,
            header: CustomHeader,
            month: {
              dateHeader: (props) => (
                <CustomDateHeader
                  {...props}
                  studyData={calendarData}
                  onDateClick={onDateClick}
                />
              ),
            },
          }}
          views={['month']}
        />
      </S.CalendarWrapper>
      <Legend />
    </S.CalendarContainer>
  );
}
