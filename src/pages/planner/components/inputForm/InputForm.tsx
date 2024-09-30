import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import RepeatDaysSelector from './RepeatDaySelector';
import * as S from './InputForm.style';
import { ITodoBox } from '@/models/todoBox.model';

export interface TodoFormDatas {
  id: string;
  title?: string;
  detail: string;
  startTime?: string;
  endTime?: string;
  repeatDays?: string[];
  repeatWeeks?: string;
}

interface InputFormProps extends React.HTMLProps<HTMLFormElement> {
  formType: 'add' | 'edit';
  setTodos: React.Dispatch<React.SetStateAction<TodoFormDatas[]>>;
  setIsAddFormOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditFormOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditIndex?: React.Dispatch<React.SetStateAction<number | null>>;
  currentIndex?: number;
  currentData?: TodoFormDatas;
  todos: ITodoBox[];
}

export const InputForm = forwardRef<HTMLFormElement, InputFormProps>(
  (
    {
      setIsEditFormOpened,
      setIsAddFormOpened,
      setEditIndex,
      setTodos,
      formType,
      currentIndex,
      currentData,
      todos,
      ...props
    },
    ref
  ) => {
    const {
      register,
      handleSubmit,
      watch,
      control,
      formState: { errors },
    } = useForm<TodoFormDatas>({
      mode: 'onSubmit',
      defaultValues: {
        repeatDays: [],
        ...currentData,
      },
    });
    const [todosExceptCurrent, setTodosExceptCurrent] = useState(() => {
      return todos.filter((_, index) => index !== currentIndex);
    });

    const startTime = watch('startTime');
    const endTime = watch('endTime');

    const validateTime = (value: string | undefined) => {
      if (!!startTime !== !!endTime) {
        return '나머지 시간도 입력해주세요.';
      }

      if (endTime && startTime) {
        return compareTime(todosExceptCurrent, startTime, endTime);
      }
      return true;
    };

    const validateTextLength = (value: string | undefined) => {
      if (value && value.length > 20) {
        return '텍스트는 최대 20자 입력가능합니다.';
      }
      return true;
    };

    const validateRepeatWeeks = (value: string | undefined) => {
      if (value && parseInt(value) > 20) {
        return '반복은 최대 20주 가능합니다.';
      }
      return true;
    };

    const onSubmit = (data: TodoFormDatas) => {
      console.log(data);

      if (formType === 'add') {
        setTodos((prev) => {
          const updatedTodos = [
            ...prev,
            { ...data, id: Date.now().toString() },
          ];
          updatedTodos.sort(sortTodos);
          return updatedTodos;
        });
        if (setIsAddFormOpened) {
          setIsAddFormOpened(false);
        }
      }
      if (formType === 'edit' && currentIndex !== undefined) {
        setTodos((prev) => {
          const updatedTodos = [...prev];
          updatedTodos[currentIndex] = {
            ...updatedTodos[currentIndex],
            ...data,
          };
          updatedTodos.sort(sortTodos);

          return updatedTodos;
        });
        if (setIsEditFormOpened) {
          setIsEditFormOpened(false);
        }
      }

      if (setEditIndex) {
        setEditIndex(null);
      }
    };

    const handleTimeClick = (id: string) => {
      const inputElement = document.getElementById(id) as HTMLInputElement;
      if (inputElement) {
        if (!inputElement.value) {
          inputElement.value = '00:00';
        }
        inputElement.showPicker();
      }
    };

    const handleDelButton = () => {
      if (currentIndex !== undefined) {
        setTodos((prev) => {
          const updatedTodos = [...prev];
          updatedTodos.splice(currentIndex, 1);
          return updatedTodos;
        });
      }
      if (setIsEditFormOpened) {
        setIsEditFormOpened(false);
      }
    };

    return (
      <S.InputFormStyle>
        <S.Form onSubmit={handleSubmit(onSubmit)} ref={ref}>
          <S.Detail>
            <div className="label-error">
              <label htmlFor="detail">할 일</label>
              {errors.detail && (
                <span className="errorText">{errors.detail.message}</span>
              )}
            </div>
            <input
              className="textInputBox"
              id="detail"
              {...register('detail', {
                required: '필수로 입력해야 합니다.',
                validate: {
                  trim: (value) =>
                    value.trim() !== '' || '공백은 입력할 수 없습니다.',
                  limitLen: validateTextLength,
                },
              })}
            />
          </S.Detail>

          <S.Title>
            <div className="label-error">
              <label htmlFor="title">과목</label>
              {errors.title && (
                <span className="errorText">{errors.title.message}</span>
              )}
            </div>
            <input
              className="textInputBox"
              id="title"
              {...register('title', { validate: validateTextLength })}
            />
          </S.Title>

          <label>시간</label>
          <S.Time>
            <div className="startTime">
              <label htmlFor="startTime">시작</label>
              <S.InputTimeStyle
                id="startTime"
                type="time"
                {...register('startTime')}
                onClick={() => {
                  handleTimeClick('startTime');
                }}
              />
            </div>
            <div className="hyphen"></div>
            <div className="endTime">
              <label htmlFor="endTime">종료</label>
              <S.InputTimeStyle
                id="endTime"
                type="time"
                {...register('endTime', {
                  validate: validateTime,
                })}
                onClick={() => {
                  handleTimeClick('endTime');
                }}
              />
            </div>
            {errors.endTime && (
              <p className="errorText">{errors.endTime.message}</p>
            )}
          </S.Time>
          <S.Footer>
            <S.Repeat>
              <label>반복</label>
              <S.DaysWrapper>
                <RepeatDaysSelector control={control} />

                <S.WeekInput
                  id="repeatWeeks"
                  {...register('repeatWeeks', {
                    validate: validateRepeatWeeks,
                  })}
                />
                <label htmlFor="repeatWeeks">주 반복</label>
              </S.DaysWrapper>
            </S.Repeat>
            {formType === 'add' ? (
              <S.SaveDelWrapper>
                <S.SaveButton type="submit">+ 추가하기</S.SaveButton>
              </S.SaveDelWrapper>
            ) : (
              <S.SaveDelWrapper>
                <S.DelButton
                  type="button"
                  onClick={() => {
                    handleDelButton();
                    if (setEditIndex) {
                      setEditIndex(null);
                    }
                  }}
                >
                  삭제하기
                </S.DelButton>
                <S.SaveButton type="submit">수정하기</S.SaveButton>
              </S.SaveDelWrapper>
            )}
          </S.Footer>
          {errors.repeatWeeks && (
            <span className="errorText repeatError">
              {errors.repeatWeeks.message}
            </span>
          )}
        </S.Form>
      </S.InputFormStyle>
    );
  }
);

function subtractMinutes(time: string, minutes: number) {
  const [hours, mins] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + mins - minutes;

  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;

  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

function compareTime(todos: ITodoBox[], startTime: string, endTime: string) {
  const endTimeMinus10 = subtractMinutes(endTime, 10);

  if (endTime < startTime) {
    return '올바른 시간을 입력해주세요.';
  }
  if (endTimeMinus10 < startTime) {
    return '10분 이상 설정해주세요.';
  }

  if (isTimeOverlap(todos, startTime, endTime)) {
    return '겹치는 일정이 존재합니다.';
  }

  return true;
}

const sortTodos = (a: TodoFormDatas, b: TodoFormDatas) => {
  const startA = a.startTime ? a.startTime.split(':').map(Number) : [24, 0];
  const startB = b.startTime ? b.startTime.split(':').map(Number) : [24, 0];
  return startA[0] - startB[0] || startA[1] - startB[1];
};

const isTimeOverlap = (
  todos: ITodoBox[],
  startTime: string,
  endTime: string
) => {
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinute = toMinutes(startTime);
  const endMinute = toMinutes(endTime);

  for (const todo of todos) {
    if (todo.startTime && todo.endTime) {
      const existingStart = toMinutes(todo.startTime);
      const existingEnd = toMinutes(todo.endTime);

      if (startMinute < existingEnd && endMinute > existingStart) {
        return true;
      }
    }
  }
  return false;
};