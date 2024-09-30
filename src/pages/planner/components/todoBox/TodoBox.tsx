import * as S from './TodoBox.style';
import CheckBox from '@/components/checkBox/CheckBox';
import { MouseEventHandler } from 'react';
import { ITodoBox } from '@/models/todoBox.model';

interface TodoBoxProps extends ITodoBox {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function TodoBox({
  id,
  title,
  detail,
  startTime,
  endTime,
  repeatDays,
  repeatWeeks,
  index,
  isChecked,
  color,
  onClick,
}: TodoBoxProps) {
  const barColor = color;

  return (
    <S.TodoBoxStyle onClick={onClick}>
      <S.ColorBarStyle barColor={barColor} />
      <S.InfoArea>
        <S.TodoStyle>{detail}</S.TodoStyle>
        <S.SubjectStyle>{title}</S.SubjectStyle>
      </S.InfoArea>
      <S.CheckBoxArea>
        <CheckBox />
      </S.CheckBoxArea>
    </S.TodoBoxStyle>
  );
}
