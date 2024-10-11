import { forwardRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import RepeatDaysSelector from './RepeatDaySelector';
import { GetTodosRes, PutPostTodoReq } from '@/models/studyRoomTodos.model';
import { deleteTodo, postTodo, putTodo } from '@/apis/planners.api';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import * as S from './InputForm.style';

interface InputFormProps extends React.HTMLProps<HTMLFormElement> {
  formType: 'add' | 'edit';
  setIsAddFormOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditFormOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date;

  todos: GetTodosRes[];
  currentData?: GetTodosRes;

  setEditIndex?: React.Dispatch<React.SetStateAction<number | null>>;
  currentIndex?: number;
}

export const InputForm = forwardRef<HTMLFormElement, InputFormProps>(
  (
    {
      formType,
      setIsEditFormOpened,
      setIsAddFormOpened,
      currentData,
      todos,
      selectedDate,
      setEditIndex,
      currentIndex,
      ...props
    },
    ref
  ) => {
    let defaultData;

    if (currentData) {
      // eslint-disable-next-line
      const {
        totalTime: _1,
        timelineList: _2,
        _id: _3,
        ...putDatas
      } = currentData;
      defaultData = putDatas;
    }
    const {
      register,
      handleSubmit,
      watch,
      control,
      setValue,
      getValues,
      formState: { errors },
    } = useForm<PutPostTodoReq>({
      mode: 'onSubmit',
      defaultValues: {
        repeatDays: [],
        ...(defaultData || {}),
      },
    });
    const [todosExceptCurrent, setTodosExceptCurrent] = useState(() => {
      return todos.filter((_, index) => index !== currentIndex);
    });

    const [todayDate, setTodayDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [repeatEndDate, setRepeatEndDate] = useState(() => {
      if (currentData?.repeatEndDate) {
        return new Date(currentData.repeatEndDate);
      }

      return null;
    });

    useEffect(() => {
      const selectedDateMidnight = new Date(selectedDate).setHours(0, 0, 0, 0);

      if (selectedDateMidnight < todayDate) {
        setDisableSaveButton(true);
      }
    }, [selectedDate, todayDate]);

    const queryClient = useQueryClient();
    const { isPending: isPostFetching, mutate: postData } = useMutation({
      mutationFn: ({ data, date }: { data: PutPostTodoReq; date: string }) =>
        postTodo(data, date),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getTodos', selectedDate],
        });
        alert('새로운 할 일이 등록되었습니다.');
      },
      onError: () => {
        alert('할 일 등록에 실패했습니다. \n 잠시 후 다시 시도해주세요.');
      },
    });
    const { isPending: isPutFetching, mutate: putData } = useMutation({
      mutationFn: ({
        data,
        plannerId,
      }: {
        data: PutPostTodoReq;
        plannerId: string;
      }) => putTodo(data, plannerId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getTodos', selectedDate],
        });
        alert('선택된 할 일이 수정되었습니다.');
      },
      onError: () => {
        alert('할 일 수정에 실패했습니다.\n 잠시 후 다시 시도해주세요.');
      },
    });

    const { isPending: isDeleteFetching, mutate: deleteData } = useMutation({
      mutationFn: ({ plannerId }: { plannerId: string }) =>
        deleteTodo(plannerId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getTodos', selectedDate],
        });
        alert('선택된 할 일이 삭제되었습니다.');
      },
    });

    const startTime = watch('startTime');
    const endTime = watch('endTime');

    const validateTime = () => {
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

    const validateRepeatEndDate = (value: string | undefined) => {
      if (value) {
        if (
          dayjs(value).isBefore(dayjs()) ||
          dayjs(value).isBefore(dayjs(selectedDate))
        ) {
          return '현재 날짜 이전의 날짜를 선택할 수 없습니다.';
        }
      }

      const repeatDaysArr = getValues('repeatDays');
      if (repeatDaysArr && repeatDaysArr.length > 0 && !value) {
        return '반복 종료일을 설정해주세요.';
      }

      return true;
    };

    const onSubmit = (data: PutPostTodoReq) => {
      let reqData = { ...data };
      if (!data.repeatEndDate) {
        // eslint-disable-next-line
        const { repeatEndDate, ...restData } = data;
        reqData = restData;
      }

      if (formType === 'add') {
        postData({
          data: reqData,
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        });

        if (setIsAddFormOpened) {
          setIsAddFormOpened(false);
        }
      }
      if (formType === 'edit' && currentIndex !== undefined) {
        if (currentData?._id) {
          putData({ data: reqData, plannerId: currentData._id });
        } else {
          alert('수정 중 오류가 발생했습니다.');
        }
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
      if (currentData?._id) {
        deleteData({ plannerId: currentData._id });
      }
      if (setIsEditFormOpened) {
        setIsEditFormOpened(false);
      }
    };

    const handleDatePickerChange = (date: Date | null) => {
      setRepeatEndDate(date);
      setValue('repeatEndDate', dayjs(date).format('YYYY-MM-DD'), {
        shouldValidate: true,
      });
    };

    return (
      <S.InputFormStyle
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <S.Form onSubmit={handleSubmit(onSubmit)} ref={ref}>
          <S.TodoArea>
            <S.LabelErrorWrapper>
              <S.Label htmlFor="todo">할 일</S.Label>
              {errors.todo && <S.ErrorText>{errors.todo.message}</S.ErrorText>}
            </S.LabelErrorWrapper>
            <S.TextInputBox
              id="todo"
              {...register('todo', {
                required: '필수로 입력해야 합니다.',
                validate: {
                  trim: (value) =>
                    value.trim() !== '' || '공백은 입력할 수 없습니다.',
                  limitLen: validateTextLength,
                },
              })}
            />
          </S.TodoArea>

          <S.Title>
            <S.LabelErrorWrapper>
              <S.Label htmlFor="subject">과목</S.Label>
              {errors.subject && (
                <S.ErrorText>{errors.subject.message}</S.ErrorText>
              )}
            </S.LabelErrorWrapper>
            <S.TextInputBox
              id="subject"
              {...register('subject', { validate: validateTextLength })}
            />
          </S.Title>

          <S.Time>
            <S.LabelErrorWrapper>
              <S.Label>시간</S.Label>
              {errors.endTime && (
                <S.ErrorText>{errors.endTime.message}</S.ErrorText>
              )}
            </S.LabelErrorWrapper>
            <S.InputTimeWrapper>
              <S.TimeLabelWrapper>
                <S.SubLabel htmlFor="startTime">시작</S.SubLabel>
                <S.InputTimeStyle
                  id="startTime"
                  type="time"
                  {...register('startTime')}
                  onClick={() => {
                    handleTimeClick('startTime');
                  }}
                />
              </S.TimeLabelWrapper>
              <S.Hyphen />
              <S.TimeLabelWrapper>
                <S.SubLabel htmlFor="endTime">종료</S.SubLabel>
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
              </S.TimeLabelWrapper>
            </S.InputTimeWrapper>
          </S.Time>
          <S.Footer>
            <S.Repeat>
              <S.LabelErrorWrapper>
                <S.Label>반복</S.Label>
                {errors.repeatEndDate ? (
                  <S.ErrorText>{errors.repeatEndDate.message}</S.ErrorText>
                ) : errors.repeatDays ? (
                  <S.ErrorText>{errors.repeatDays.message}</S.ErrorText>
                ) : null}
              </S.LabelErrorWrapper>
              <S.SubLabel htmlFor="repeatDays">반복 요일</S.SubLabel>
              <RepeatDaysSelector
                control={control}
                repeatEndDate={repeatEndDate}
              />
              <S.SubLabel htmlFor="repeatEndDate">반복 종료일</S.SubLabel>
              <S.StyledDatePicker>
                <DatePicker
                  showIcon
                  icon={<S.CalendarIcon />}
                  locale={ko}
                  selected={repeatEndDate}
                  dateFormatCalendar="YYYY년 MMMM"
                  dateFormat="yyyy.MM.dd (EE)"
                  onChange={handleDatePickerChange}
                  isClearable
                  placeholderText="반복 날짜를 선택해주세요."
                ></DatePicker>
              </S.StyledDatePicker>
              <input
                id="repeatEndDate"
                type="hidden"
                {...register('repeatEndDate', {
                  validate: validateRepeatEndDate,
                })}
              ></input>
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
                <S.SaveButton
                  type="submit"
                  disabled={disableSaveButton}
                  onMouseEnter={() => {
                    setTodayDate(new Date().setHours(0, 0, 0, 0));
                  }}
                >
                  수정하기
                </S.SaveButton>
                <S.DisabledInform isDisabled={disableSaveButton}>
                  지난 날짜의 할 일은 수정이 불가능합니다.
                </S.DisabledInform>
              </S.SaveDelWrapper>
            )}
          </S.Footer>
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

function compareTime(todos: GetTodosRes[], startTime: string, endTime: string) {
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

// const sortTodos = (a: PutPostTodoReq, b: PutPostTodoReq) => {
//   const startA = a.startTime ? a.startTime.split(':').map(Number) : [24, 0];
//   const startB = b.startTime ? b.startTime.split(':').map(Number) : [24, 0];
//   return startA[0] - startB[0] || startA[1] - startB[1];
// };

const isTimeOverlap = (
  todos: GetTodosRes[],
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
