// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  PutPostTodoReq,
  ServerToClientPlanner,
} from '@/models/studyRoomTodos.model';
import { formatDateTime, isWithinOneDay } from '../utils/dateFormat';
// import { AxiosError } from 'axios';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import CheckBox from '@/components/checkBox/CheckBox';
import { MouseEvent, useEffect, useState } from 'react';
import useStudyRoomStore from '@/stores/studyRoom.store';
import { useForm } from 'react-hook-form';
import * as S from './Todos.style';
import { useSocket } from '@/socket/SocketContext';

const Todos = () => {
  const socket = useSocket();
  const todos = useStudyRoomStore((state) => state.todos);
  const updateTodos = useStudyRoomStore((state) => state.updateTodos);
  const addTodos = useStudyRoomStore((state) => state.addTodos);
  const setTodos = useStudyRoomStore((state) => state.setTodos);
  const toggleTodoComplete = useStudyRoomStore(
    (state) => state.toggleTodoComplete
  );

  const { selectedTodo, setSelectedTodo } = useStudyRoomStore();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD')
  );
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

  // const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<PutPostTodoReq>({
    mode: 'onSubmit',
  });

  const handleLeftArrow = () => {
    if (
      isWithinOneDay(
        dayjs(selectedDate).subtract(1, 'day').format('YYYY-MM-DD')
      )
    ) {
      setSelectedDate(
        dayjs(selectedDate).subtract(1, 'day').format('YYYY-MM-DD')
      );
      socket?.emit('responseGetPlanner', selectedDate);
    }
  };

  const handleRightArrow = () => {
    if (
      isWithinOneDay(dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD'))
    ) {
      setSelectedDate(dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD'));
      socket?.emit('responseGetPlanner', selectedDate);
    }
  };

  const handleEditButton = (
    e: MouseEvent<SVGElement>,
    todo: ServerToClientPlanner
  ) => {
    e.stopPropagation();
    setEditingTodo(todo._id);
    setIsAddFormOpened(false);
    setValue('todo', todo.todo);
    setTimeout(() => {
      setFocus('todo');
    }, 0);
  };

  const handleAddButton = () => {
    setValue('todo', '');
    setTimeout(() => {
      setFocus('todo');
    }, 0);
    setIsAddFormOpened(true);
    setEditingTodo(null);
  };

  const handleCancelButton = () => {
    setIsAddFormOpened(false);
  };

  const handleEditCancelButton = () => {
    setEditingTodo(null);
  };

  const handleCheckBoxChange = (todoId: string) => {
    toggleTodoComplete(todoId);
  };

  const onPutSubmit = (data: PutPostTodoReq, todo: ServerToClientPlanner) => {
    if (data.todo !== todo.todo) {
      const payload = {
        plannerId: todo._id,
        todo: data.todo,
        isComplete: data.isComplete,
      };
      socket?.emit('modifyPlanner', payload);
    }
    setEditingTodo(null);
  };

  const onPostSubmit = (data: PutPostTodoReq) => {
    const date = selectedDate;
    const payload = {
      date: date,
      todo: data.todo,
    };
    socket?.emit('createPlanner', payload);
    setIsAddFormOpened(false);
  };

  const createPlanner = (newTodo: ServerToClientPlanner) => {
    addTodos(newTodo);
  };

  const updatePlanner = (updateTodo: ServerToClientPlanner) => {
    updateTodos(updateTodo);
  };

  // 임시 socket 코드 작성
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.emit('getPlanner', { date: selectedDate });

    socket.on('responseGetPlanner', (data) => {
      // console.log(data);
      setTodos(data);
    });

    socket.on('responseCreatePlanner', (data) => {
      console.log(data);
      createPlanner(data);
    });

    socket.on('responseModifyPlanner', (data) => {
      console.log(data);
      updatePlanner(data);
    });

    return () => {
      socket.off('responseGetPlanner');
      socket.off('responseCreatePlanner');
      socket.off('responseModifyPlanner');
    };
  }, [socket, selectedDate]);
  // end

  return (
    <S.Wrapper>
      <S.DateWrapper>
        <S.DateArrow onClick={handleLeftArrow}>
          <IoIosArrowBack />
        </S.DateArrow>
        <S.DateBox>{formatDateTime(selectedDate)}</S.DateBox>
        <S.DateArrow onClick={handleRightArrow}>
          <IoIosArrowForward />
        </S.DateArrow>
      </S.DateWrapper>

      <S.TodosArea>
        {todos?.map((todo) => {
          if (!todo.todo) {
            return;
          }
          const todoText = omitLongText(todo.todo, 8);

          return (
            <S.TodoBox
              key={todo._id}
              onClick={() => {
                setSelectedTodo(todo);
              }}
              isSelected={selectedTodo?._id === todo._id ? true : false}
            >
              <CheckBox
                defaultChecked={todo.isComplete}
                onChange={() => handleCheckBoxChange(todo._id)}
              />
              {editingTodo === todo._id ? (
                <S.TodoForm
                  onSubmit={handleSubmit((data) => onPutSubmit(data, todo))}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <S.TextAndErrorWrapper>
                    <S.TodoTextInput
                      onClick={(e) => e.stopPropagation()}
                      {...register('todo', {
                        required: '필수로 입력해야 합니다.',
                        validate: {
                          trim: (value) =>
                            value.trim() !== '' || '한 글자 이상 입력해주세요.',
                          limitLen: (value) =>
                            value.length < 20 || '20자 이내로 작성해주세요.',
                        },
                      })}
                    ></S.TodoTextInput>
                    {errors.todo && (
                      <S.ErrorText>{errors.todo.message}</S.ErrorText>
                    )}
                  </S.TextAndErrorWrapper>

                  <S.TodoSaveButton type="submit">
                    <S.TodoSaveIcon />
                  </S.TodoSaveButton>
                  <S.TodoCancelButton
                    type="button"
                    onClick={handleEditCancelButton}
                  >
                    <S.TodoCancelIcon />
                  </S.TodoCancelButton>
                </S.TodoForm>
              ) : (
                <>
                  <S.TodoTextArea isChecked={todo.isComplete}>
                    {todoText}
                  </S.TodoTextArea>
                  <S.TodoEditIcon onClick={(e) => handleEditButton(e, todo)} />
                </>
              )}
            </S.TodoBox>
          );
        })}
        {isAddFormOpened && (
          <S.TodoBox>
            <CheckBox isVisible={false} />
            <S.TodoForm onSubmit={handleSubmit((data) => onPostSubmit(data))}>
              <S.TextAndErrorWrapper>
                <S.TodoTextInput
                  {...register('todo', {
                    required: '필수로 입력해야 합니다.',
                    validate: {
                      trim: (value) =>
                        value.trim() !== '' || '한 글자 이상 입력해주세요.',
                      limitLen: (value) =>
                        value.length < 20 || '20자 이내로 작성해주세요.',
                    },
                  })}
                ></S.TodoTextInput>
                {errors.todo && (
                  <S.ErrorText>{errors.todo.message}</S.ErrorText>
                )}
              </S.TextAndErrorWrapper>
              <S.TodoSaveButton type="submit">
                <S.TodoSaveIcon />
              </S.TodoSaveButton>
              <S.TodoCancelButton type="button" onClick={handleCancelButton}>
                <S.TodoCancelIcon />
              </S.TodoCancelButton>
            </S.TodoForm>
          </S.TodoBox>
        )}
      </S.TodosArea>

      <S.AddButton onClick={handleAddButton}>
        <S.PlusSign />
        <S.AddText>추가하기</S.AddText>
      </S.AddButton>
    </S.Wrapper>
  );
};

export default Todos;

const omitLongText = (text: string, limitLength: number) => {
  if (text.length > limitLength) {
    text = text.slice(0, limitLength) + '...';
  }

  return text;
};
