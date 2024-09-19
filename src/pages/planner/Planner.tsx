import { useEffect, useRef, useState } from 'react';
import CustomDatePicker from '@/components/datePicker/DatePicker';
import TodoBox from './components/todoBox/TodoBox';
import TimeLine from './components/timeLine/TimeLine';
import TimeTable from './components/timeTable/TimeTable';
import { InputForm } from './components/inputForm/InputForm';
import { colorMap } from '@/data/colorMap';
import { ITodoBox } from '@/models/todoBox.model';
import * as S from './Planner.style';

export default function Planner() {
  const [timeLineFullHeight, setTimeLineFullHeight] = useState(0);
  const [isEditFormOpened, setIsEditFormOpened] = useState<boolean>(false);
  const [isAddFormOpened, setIsAddFormOpened] = useState<boolean>(false);
  const [todos, setTodos] = useState<ITodoBox[]>(testData);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const timeLineHeightRef = useRef<HTMLDivElement | null>(null);
  const inputFormRef = useRef<HTMLFormElement | null>(null);
  const editFormRef = useRef<Record<number, HTMLDivElement | null>>({});

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

  return (
    <S.PlannerWrapper>
      <S.LeftPanel>
        <div className="label">오늘의 계획표</div>
        <S.LeftHeader>
          <CustomDatePicker className="date" />
          <div className="addButton" onClick={handleAddButton}>
            +
          </div>
        </S.LeftHeader>
        <S.LeftContentWrapper ref={timeLineHeightRef}>
          {todos.length !== 0 && <S.TimeLineFull height={timeLineFullHeight} />}
          <S.TodosWrapper>
            {todos.length
              ? todos.map((todo, index) => {
                  return (
                    <div key={todo.id}>
                      <S.EachContentWrapper
                        ref={(el) => (editFormRef.current[index] = el)}
                      >
                        <TimeLine
                          startTime={todo.startTime}
                          endTime={todo.endTime}
                        />
                        <TodoBox
                          {...todo}
                          index={index}
                          onClick={() => {
                            handleTodoBoxClick(index);
                          }}
                          color={colorMap[index]}
                        ></TodoBox>
                      </S.EachContentWrapper>
                      {isEditFormOpened && index === editIndex && (
                        <InputForm
                          setIsEditFormOpened={setIsEditFormOpened}
                          setTodos={setTodos}
                          formType="edit"
                          currentData={todo}
                          setEditIndex={setEditIndex}
                          currentIndex={index}
                          todos={todos}
                        />
                      )}
                    </div>
                  );
                })
              : !isAddFormOpened && (
                  <S.NoData>
                    오늘의 공부 계획을
                    <br />
                    세워보세요!
                  </S.NoData>
                )}
            {isAddFormOpened ? (
              <InputForm
                ref={inputFormRef}
                setIsAddFormOpened={setIsAddFormOpened}
                setTodos={setTodos}
                formType="add"
                setEditIndex={setEditIndex}
                todos={todos}
              />
            ) : null}
          </S.TodosWrapper>
        </S.LeftContentWrapper>
      </S.LeftPanel>
      <S.RightPanel>
        <div className="label">오늘의 스터디 시간</div>
        <S.StudiedTime>XX시간 XX분 공부했어요!</S.StudiedTime>
        <TimeTable
          todos={todos.map((todo, index) => {
            return { ...todo, color: colorMap[index] };
          })}
        />
      </S.RightPanel>
    </S.PlannerWrapper>
  );
}

const testData: ITodoBox[] = [
  { id: '1', detail: '할일1', startTime: '08:33', endTime: '08:52' },
  {
    id: '2',
    title: '제목2',
    detail: '할일2',
    startTime: '09:00',
    endTime: '10:00',
  },
  {
    id: '3',
    title: '제목3',
    detail: '할일3',
    startTime: '12:00',
    endTime: '14:00',
  },
  { id: '4', title: '제목4', detail: '할일4', startTime: '', endTime: '' },
  { id: '5', title: '제목5', detail: '할일5', startTime: '', endTime: '' },
  {
    id: '6',
    title: '제목6',
    detail: '할일6',
    startTime: '19:00',
    endTime: '21:00',
  },
  { id: '7', title: '제목1', detail: '할일1', startTime: '', endTime: '' },
  // { id: '8', title: '제목2', detail: '할일2', startTime: '', endTime: '' },
  // { id: '9', title: '제목3', detail: '할일3', startTime: '', endTime: '' },
  // { id: '10', title: '제목4', detail: '할일4', startTime: '', endTime: '' },
  // { id: '11', title: '제목5', detail: '할일5', startTime: '', endTime: '' },
  // { id: '12', title: '제목6', detail: '할일6', startTime: '', endTime: '' },
  // { id: '13', title: '제목1', detail: '할일1', startTime: '', endTime: '' },
  // { id: '14', title: '제목2', detail: '할일2', startTime: '', endTime: '' },
  // { id: '15', title: '제목3', detail: '할일3', startTime: '', endTime: '' },
  // { id: '16', title: '제목4', detail: '할일4', startTime: '', endTime: '' },
  // { id: '17', title: '제목5', detail: '할일5', startTime: '', endTime: '' },
  // { id: '18', title: '제목6', detail: '할일6', startTime: '', endTime: '' },
];
