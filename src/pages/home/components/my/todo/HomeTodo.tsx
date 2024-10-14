import * as S from './HomeTodo.style';
import { getTodos, patchCheckBox } from '@/apis/planners.api';
import dayjs from 'dayjs';
import Loader from '@/components/loader/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Todo {
  _id: string;
  todo: string;
  isComplete: boolean;
}

function HomeTodo() {
  const queryClient = useQueryClient();
  const today = dayjs().format('YYYY-MM-DD');

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ['todos', today],
    queryFn: () => getTodos(today),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => patchCheckBox(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', today],
      });
    },
    onError: (error: Error) => {
      console.error('체크박스 업데이트 중 오류 발생:', error);
    },
  });

  const handleCheckboxChange = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <S.HomeTodoStyle>
      <S.Title>오늘의 할 일</S.Title>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>{error?.message || '할 일을 불러오는 중 오류가 발생했습니다.'}</p>
      ) : (
        <S.TodoWrap>
          {todos && todos.length > 0 ? (
            <S.TodoItem>
              {todos.map((todo) => (
                <S.Todo key={todo._id}>
                  <S.Checkbox
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={() => handleCheckboxChange(todo._id)}
                  />
                  {todo.todo}
                </S.Todo>
              ))}
            </S.TodoItem>
          ) : (
            <S.NoData>오늘 할 일이 없습니다.</S.NoData>
          )}
        </S.TodoWrap>
      )}
    </S.HomeTodoStyle>
  );
}

export default HomeTodo;
