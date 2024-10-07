import { Fragment, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import CustomDatePicker from '@/components/datePicker/DatePicker';
import TodoBox from './components/todoBox/TodoBox';
import TimeLine from './components/timeLine/TimeLine';
import TimeTable from './components/timeTable/TimeTable';
import { InputForm } from './components/inputForm/InputForm';
import { getTodos } from '@/apis/planners.api';
import { GetTodosRes } from '@/models/studyRoomTodos.model';
import { colorMap } from '@/data/colorMap';
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
    <S.PlannerWrapper>
      <S.LeftPanel>
        <div className="label">오늘의 계획</div>
        <S.LeftHeader>
          <CustomDatePicker
            className="date"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <S.AddButton
            onClick={() => {
              if (
                selectedDate.setHours(0, 0, 0, 0) <
                new Date().setHours(0, 0, 0, 0)
              ) {
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
            {todos && todos.length
              ? todos.map((todo, index) => {
                  return (
                    <Fragment key={todo._id}>
                      <S.EachContentWrapper
                        ref={(el) => (editFormRef.current[index] = el)}
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
              : !isAddFormOpened &&
                (todosPending ? (
                  <S.Loader />
                ) : (
                  <S.NoData>
                    오늘의 공부 계획을
                    <br />
                    세워보세요!
                  </S.NoData>
                ))}
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
        <S.StudiedTime>XX시간 XX분 공부했어요!</S.StudiedTime>
        <TimeTable selectedDate={selectedDate} />
      </S.RightPanel>
    </S.PlannerWrapper>
  );
}
