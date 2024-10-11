import { Fragment, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import CustomDatePicker from '@/components/datePicker/DatePicker';
import TodoBox from './components/todoBox/TodoBox';
import TimeLine from './components/timeLine/TimeLine';
import TimeTable from './components/timeTable/TimeTable';
import { InputForm } from './components/inputForm/InputForm';
import { getTodos, getStatistics } from '@/apis/planners.api';
import { GetStatisticsRes, GetTodosRes } from '@/models/studyRoomTodos.model';
import { colorMap } from '@/data/colorMap';
import Loader from '@/components/loader/Loader';
import * as S from './Planner.style';

export default function Planner() {
  const [timeLineFullHeight, setTimeLineFullHeight] = useState(0);
  const [isEditFormOpened, setIsEditFormOpened] = useState<boolean>(false);
  const [isAddFormOpened, setIsAddFormOpened] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const timeLineHeightRef = useRef<HTMLDivElement | null>(null);
  const inputFormRef = useRef<HTMLFormElement | null>(null);
  const editFormRef = useRef<Record<number, HTMLDivElement | null>>({});

  const { data: todos, isPending: todosPending } = useQuery<GetTodosRes[]>({
    queryKey: ['getTodos', selectedDate],
    queryFn: () => getTodos(dayjs(selectedDate).format('YYYY-MM-DD')) ?? [],
  });
  const DEFAULT_TEXT = '오늘의 첫 공부 시간을 기록해보세요!';

  const { data: statistics, isPending: statisticsPending } =
    useQuery<GetStatisticsRes>({
      queryKey: ['getStatistics', selectedDate],
      queryFn: () =>
        getStatistics(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          selectedDate.getDate()
        ),
      enabled: !!todos,
    });

  useEffect(() => {
    if (timeLineHeightRef.current) {
      const newHeight = timeLineHeightRef.current.scrollHeight;
      setTimeLineFullHeight(newHeight);
    }
  }, [todos, isEditFormOpened, isAddFormOpened]);

  const handleAddButton = () => {
    setIsAddFormOpened(!isAddFormOpened);
    setIsEditFormOpened(false);
  };

  const handleTodoBoxClick = (index: number) => {
    if (editIndex === index) {
      setIsEditFormOpened(!isEditFormOpened);
      setEditIndex(null);
    } else {
      setEditIndex(index);
      setIsEditFormOpened(true);
    }
    setIsAddFormOpened(false);
  };

  useEffect(() => {
    if (isAddFormOpened && inputFormRef.current) {
      inputFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (isEditFormOpened && editIndex && editFormRef.current[editIndex]) {
      editFormRef.current[editIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isAddFormOpened, isEditFormOpened, editIndex]);

  useEffect(() => {
    setIsAddFormOpened(false);
    setIsEditFormOpened(false);
  }, [selectedDate]);

  return (
    <S.PlannerWrapper
      onClick={() => {
        setIsAddFormOpened(false);
        setIsEditFormOpened(false);
        setEditIndex(null);
      }}
    >
      <S.LeftPanel>
        <div className="label">오늘의 계획</div>
        <S.LeftHeader>
          <CustomDatePicker
            className="date"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <S.AddButton
            onClick={(e) => {
              e.stopPropagation();
              const selectedDateMidnight = new Date(selectedDate).setHours(
                0,
                0,
                0,
                0
              );
              if (selectedDateMidnight < new Date().setHours(0, 0, 0, 0)) {
                alert(
                  `지난 날짜의 할 일 추가는 불가능합니다. \n${dayjs().format('YYYY-MM-DD')} 이후의 날짜에서 다시 시도해주세요.`
                );
                return;
              }
              handleAddButton();
            }}
          ></S.AddButton>
        </S.LeftHeader>
        <S.LeftContentWrapper ref={timeLineHeightRef}>
          {todos && todos.length !== 0 && (
            <S.TimeLineFull height={timeLineFullHeight} />
          )}
          <S.TodosWrapper>
            {todosPending || statisticsPending ? (
              <Loader />
            ) : todos && todos.length ? (
              todos.map((todo, index) => {
                return (
                  <Fragment key={todo._id}>
                    <S.EachContentWrapper
                      ref={(el) => (editFormRef.current[index] = el)}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <TimeLine
                        startTime={todo.startTime}
                        endTime={todo.endTime}
                      />
                      <TodoBox
                        {...todo}
                        onClick={() => {
                          handleTodoBoxClick(index);
                        }}
                        color={colorMap[index] ?? 'gainsboro'}
                        selectedDate={selectedDate}
                      ></TodoBox>
                    </S.EachContentWrapper>
                    {isEditFormOpened && index === editIndex && (
                      <InputForm
                        formType="edit"
                        setIsEditFormOpened={setIsEditFormOpened}
                        currentData={todo}
                        setEditIndex={setEditIndex}
                        currentIndex={index}
                        todos={todos}
                        selectedDate={selectedDate}
                      />
                    )}
                  </Fragment>
                );
              })
            ) : !isAddFormOpened ? (
              <S.NoData>
                오늘의 공부 계획을
                <br />
                세워보세요!
              </S.NoData>
            ) : (
              <></>
            )}

            {isAddFormOpened ? (
              <InputForm
                formType="add"
                ref={inputFormRef}
                setIsAddFormOpened={setIsAddFormOpened}
                setEditIndex={setEditIndex}
                todos={todos ?? []}
                selectedDate={selectedDate}
              />
            ) : null}
          </S.TodosWrapper>
        </S.LeftContentWrapper>
      </S.LeftPanel>
      <S.RightPanel>
        <div className="label">오늘의 공부 시간</div>
        <S.StudiedTime>
          {statisticsPending
            ? ''
            : statistics
              ? (() => {
                  const [hours, minutes] = statistics.totalTime.split(':');
                  if (hours === '00' && minutes === '00') {
                    return DEFAULT_TEXT;
                  }
                  return `${hours}시간 ${minutes}분 공부했어요!`;
                })()
              : DEFAULT_TEXT}
        </S.StudiedTime>
        <TimeTable selectedDate={selectedDate} />
      </S.RightPanel>
    </S.PlannerWrapper>
  );
}
