import { colorMap } from '@/data/colorMap';
import * as S from './TodoBox.style';
import CheckBox from '@/components/checkBox/CheckBox';
import { MouseEventHandler } from 'react';

export interface TodoBoxProps {
  id: string;
  title?: string;
  detail: string;
  startTime?: string;
  endTime?: string;
  repeatDays?: string[];
  repeatWeeks?: string;
  index?: number;
  isChecked?: boolean;
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
  onClick,
}: TodoBoxProps) {
  const indexStr = index?.toString();

  const barColor =
    indexStr !== undefined && indexStr in colorMap
      ? colorMap[indexStr]
      : undefined;

  return (
    <S.TodoBoxStyle onClick={onClick}>
      <S.ColorBarStyle barColor={barColor} />
      <S.InfoArea>
        <S.TitleStyle>{title}</S.TitleStyle>
        <S.DetailStyle>{detail}</S.DetailStyle>
      </S.InfoArea>
      <CheckBox />
    </S.TodoBoxStyle>
  );
}
