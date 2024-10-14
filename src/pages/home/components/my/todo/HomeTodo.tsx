import { useEffect, useState } from 'react';
import * as S from './HomeTodo.style';
import { getTodos, patchCheckBox } from '@/apis/planners.api';
import dayjs from 'dayjs';
import Loader from '@/components/loader/Loader';

interface Todo {
  _id: string;
  todo: string;
  isComplete: boolean;
}

function HomeTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const today = dayjs().format('YYYY-MM-DD');
        const fetchedTodos = await getTodos(today);
        setTodos(fetchedTodos);
      } catch (error) {
        console.error('할 일을 불러오는 중 오류 발생:', error);
        setError('할 일을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleCheckboxChange = async (id: string, isComplete: boolean) => {
    try {
      await patchCheckBox(id);

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, isComplete: !isComplete } : todo
        )
      );
    } catch (error) {
      console.error('체크박스 업데이트 중 오류 발생:', error);
      setError('체크박스 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <S.HomeTodoStyle>
      <S.Title>오늘의 할 일</S.Title>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <S.TodoWrap>
          {todos.length > 0 ? (
            <S.TodoItem>
              {todos.map((todo) => (
                <S.Todo key={todo._id}>
                  <S.Checkbox
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={() =>
                      handleCheckboxChange(todo._id, todo.isComplete)
                    }
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
