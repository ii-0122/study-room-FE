import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getTodos, postTodo, putTodo } from '@/apis/planners.api';
import { GetTodosRes, PutPostTodoReq } from '@/models/studyRoomTodos.model';
import { formatDateTime, isWithinOneDay } from '../utils/dateFormat';
import { AxiosError } from 'axios';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import CheckBox from '@/components/checkBox/CheckBox';
import { MouseEvent, useState } from 'react';
import useStudyRoomStore from '@/stores/studyRoom.store';
import { useForm } from 'react-hook-form';
import * as S from './Todos.style';

export default function Todos() {
  const { selectedTodo, setSelectedTodo } = useStudyRoomStore();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD')
  );
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<PutPostTodoReq>({
    mode: 'onSubmit',
  });

  // const { data: todos } = useQuery<GetTodosRes[], AxiosError>({
  //   queryKey: ['getTodos', selectedDate],
  //   queryFn: () => getTodos(selectedDate),
  // });

  // @ 임시데이터
  const [todos, setTodos] = useState([
    { todo: 'ㅡㅡㅡㅡㅡㅡㅡㅡㅡ', _id: '1', isChecked: false },
    { todo: 'todo2', _id: '2', isChecked: false },
    { todo: 'todo3', _id: '3', isChecked: true },
    { todo: 'todo4', _id: '4', isChecked: true },
    { todo: 'todo5', _id: '5', isChecked: true },
    { todo: 'todo6', _id: '6', isChecked: true },
    { todo: 'todo7', _id: '7', isChecked: true },
    { todo: 'todo8', _id: '8', isChecked: true },
    { todo: 'todo9', _id: '9', isChecked: true },
    { todo: 'todo10', _id: '10', isChecked: true },
    { todo: 'todo11', _id: '11', isChecked: true },
    { todo: 'todo12', _id: '12', isChecked: true },
  ]);

  const putMutation = useMutation({
    mutationFn: ({ _id, data }: { data: PutPostTodoReq; _id: string }) =>
      putTodo(data, _id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTodos', selectedDate],
      });
    },
  });

  const postMutation = useMutation({
    mutationFn: ({ data, date }: { data: PutPostTodoReq; date: string }) =>
      postTodo(data, date),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTodos', selectedDate],
      });
    },
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
    }
  };

  const handleRightArrow = () => {
    if (
      isWithinOneDay(dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD'))
    ) {
      setSelectedDate(dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD'));
    }
  };

  const handleEditButton = (e: MouseEvent<SVGElement>, todo: GetTodosRes) => {
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

  const handleCheckBoxChange = (checked: boolean, todoId: string) => {
    // @ 임시데이터의 체크박스값 수정
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === todoId ? { ...todo, isChecked: checked } : todo
      )
    );

    // @ 백엔드에 데이터 수정 요청 코드 추가
  };

  const onPutSubmit = (data: PutPostTodoReq, todo: GetTodosRes) => {
    if (data.todo !== todo.todo) {
      const _id = todo._id;
      putMutation.mutate({ data, _id });
    }
    setEditingTodo(null);
  };

  const onPostSubmit = (data: PutPostTodoReq) => {
    const date = selectedDate;
    postMutation.mutate({ data, date });
    setIsAddFormOpened(false);
  };

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
                defaultChecked={todo.isChecked}
                onChange={(checked) => handleCheckBoxChange(checked, todo._id)}
              />
              {editingTodo === todo._id ? (
                <S.TodoForm
                  onSubmit={handleSubmit((data) => onPutSubmit(data, todo))}
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
                  <S.TodoTextArea isChecked={todo.isChecked}>
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
}

const omitLongText = (text: string, limitLength: number) => {
  if (text.length > limitLength) {
    text = text.slice(0, limitLength) + '...';
  }

  return text;
};
