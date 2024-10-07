import { MouseEventHandler } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CheckBox from '@/components/checkBox/CheckBox';
import { patchCheckBox } from '@/apis/planners.api';
import { GetTodosRes } from '@/models/studyRoomTodos.model';
import * as S from './TodoBox.style';

interface TodoBoxProps extends GetTodosRes {
  onClick?: MouseEventHandler<HTMLDivElement>;
  color?: string | undefined;
  selectedDate: Date;
}

export default function TodoBox({
  _id,
  subject,
  todo,
  isComplete,
  color,
  selectedDate,
  repeatDays,
  repeatEndDate,
  onClick,
}: TodoBoxProps) {
  const queryClient = useQueryClient();
  const barColor = color;

  const mutation = useMutation({
    mutationFn: () => patchCheckBox(_id),
    onSuccess: () => {
      if (selectedDate) {
        queryClient.invalidateQueries({
          queryKey: ['getTodos', selectedDate],
        });
      }
    },
  });

  const handleCheckBoxClick = () => {
    mutation.mutate();
  };

  return (
    <S.TodoBoxStyle onClick={onClick}>
      <S.ColorBarStyle barColor={barColor} />
      <S.InfoArea>
        <S.InfoTextArea>
          <S.TodoStyle>{todo}</S.TodoStyle>
          <S.SubjectStyle>{subject}</S.SubjectStyle>
          <S.RepeatContainer>
            <S.RepeatIcon />
            {repeatDays.length > 0 ? (
              <>
                반복종료일 : {repeatEndDate} / 반복 요일 :
                {repeatDays.map((elem) => {
                  return ' ' + elem;
                })}
              </>
            ) : (
              <>반복없음</>
            )}
          </S.RepeatContainer>
        </S.InfoTextArea>
      </S.InfoArea>

      <S.CheckBoxArea>
        <CheckBox
          defaultChecked={isComplete}
          onChange={handleCheckBoxClick}
          disabled={mutation.isPending}
        />
      </S.CheckBoxArea>
    </S.TodoBoxStyle>
  );
}
