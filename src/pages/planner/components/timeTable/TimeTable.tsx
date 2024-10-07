import { useEffect, useState } from 'react';
import { colorMap, hex2rgba } from '@/data/colorMap';
import { GetTodosRes, StartEndTime } from '@/models/studyRoomTodos.model';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '@/apis/planners.api';
import dayjs from 'dayjs';
import * as S from './TimeTable.style';

interface TimeTableProps {
  selectedDate: Date;
}

interface GetTodosResWithColor extends GetTodosRes {
  color: string;
}

export default function TimeTable({ selectedDate }: TimeTableProps) {
  const gridArray = new Array(7 * 24).fill(1);
  const [todosWithColor, setTodosWithColor] = useState<GetTodosResWithColor[]>(
    []
  );

  const { data: todos } = useQuery<GetTodosRes[]>({
    queryKey: ['getTodos', selectedDate],
    queryFn: () => getTodos(dayjs(selectedDate).format('YYYY-MM-DD')) ?? [],
  });

  useEffect(() => {
    const newTodosWithColor =
      todos &&
      todos.map((todo, index) => {
        return { ...todo, color: colorMap[index] ?? 'gainsboro' };
      });

    if (newTodosWithColor) {
      setTodosWithColor(newTodosWithColor);
    }
  }, [todos]);

  return (
    <S.TimeTableContainer>
      {gridArray.map((_, index) => {
        let isPlanSelected = false;
        let isPlanStart = false;
        let isPlanEnd = false;
        let planColor, timelineColor;
        let planStartIndex, planEndIndex, timelineStartIndex, timelineEndIndex;
        let planStartWidth, planEndWidth, timelineStartWidth, timelineEndWidth;
        const timelineElements = [];

        // 오늘 계획된 할 일
        for (const todo of todosWithColor) {
          const planResult = calcGridIndex(todo);
          planStartIndex = planResult.startIndex;
          planEndIndex = planResult.endIndex;
          planColor = planResult.color;
          planStartWidth = planResult.startWidth;
          planEndWidth = planResult.endWidth;

          if (
            planStartIndex &&
            planEndIndex &&
            index >= planStartIndex &&
            index <= planEndIndex
          ) {
            isPlanSelected = true;
            if (planStartIndex === index) isPlanStart = true;
            if (planEndIndex === index) isPlanEnd = true;
            break;
          }
        }

        // 실제 공부된 할 일 (오늘)
        for (const todo of todosWithColor) {
          if (todo.timelineList) {
            for (const timeline of todo.timelineList) {
              const timelineResult = calcGridIndexFromTimeline(
                timeline,
                todo.color
              );
              timelineStartIndex = timelineResult.startIndex;

              timelineEndIndex = timelineResult.endIndex;
              timelineColor = timelineResult.color;
              timelineStartWidth = timelineResult.startWidth;
              timelineEndWidth = timelineResult.endWidth;

              if (
                timelineStartIndex &&
                timelineEndIndex &&
                index >= timelineStartIndex &&
                index <= timelineEndIndex
              ) {
                timelineElements.push({
                  startIndex: timelineStartIndex,
                  endIndex: timelineEndIndex,
                  color: timelineColor,
                  startWidth: timelineStartWidth,
                  endWidth: timelineEndWidth,
                  startFrom: timelineResult.startFrom,
                  interval: timelineResult.interval,
                  planColor: planColor,
                });
              }
            }
          }
        }

        if (index % 7 === 0) {
          return <S.HourCell key={index}>{index / 7}</S.HourCell>;
        }
        return (
          <S.Cell key={index}>
            {isPlanSelected && (
              <S.SelectedTime
                isStart={isPlanStart}
                isEnd={isPlanEnd}
                color={planColor}
                startWidth={planStartWidth}
                endWidth={planEndWidth}
              />
            )}

            {timelineElements.map((timeline, idx) => {
              if (timeline.startIndex === timeline.endIndex) {
                return (
                  <S.SelectedTimeline
                    key={idx}
                    startFrom={timeline.startFrom}
                    interval={timeline.interval}
                    color={timeline.color}
                    planColor={timeline.planColor}
                  ></S.SelectedTimeline>
                );
              }
              return (
                <S.SelectedTimeline
                  key={idx}
                  isStart={timeline.startIndex === index}
                  isEnd={timeline.endIndex === index}
                  color={timeline.color}
                  startWidth={timeline.startWidth}
                  endWidth={timeline.endWidth}
                  planColor={timeline.planColor}
                />
              );
            })}
          </S.Cell>
        );
      })}
    </S.TimeTableContainer>
  );
}

const calcGridIndex: (todo: GetTodosResWithColor) => {
  startIndex: number | undefined;
  endIndex: number | undefined;
  color: string | undefined;
  startWidth: string | undefined;
  endWidth: string | undefined;
} = (todo) => {
  let startIndex;
  let endIndex;
  let color;
  let startWidth;
  let endWidth;

  if (todo.startTime && todo.endTime) {
    const [startHour, startMinute] = todo.startTime
      .split(':')
      .map((val) => parseInt(val));

    const [endHour, endMinute] = todo.endTime
      .split(':')
      .map((val) => parseInt(val));

    startIndex = 7 * startHour + Math.floor(startMinute / 10) + 1;
    endIndex = 7 * endHour + Math.ceil(endMinute / 10);
    color = todo.color ? hex2rgba(todo.color, 0.3) : undefined;

    startWidth = `${(startMinute % 10) * 10}%`;
    endWidth = `${100 - (endMinute % 10) * 10}%`;

    return { startIndex, endIndex, color, startWidth, endWidth };
  }

  return {
    startIndex,
    endIndex,
    color,
    startWidth,
    endWidth,
  };
};

const calcGridIndexFromTimeline = (timeline: StartEndTime, color: string) => {
  const [startHour, startMinute] = timeline.startTime.time
    .split(':')
    .map((val) => parseInt(val));
  const startIndex = 7 * startHour + Math.floor(startMinute / 10) + 1;

  const startWidth = `${(startMinute % 10) * 10}%`;

  const [endHour, endMinute] = timeline.endTime.time
    .split(':')
    .map((val) => parseInt(val));
  const endIndex = 7 * endHour + Math.ceil(endMinute / 10);
  let endWidth = `${100 - (endMinute % 10) * 10}%`;
  endWidth = endHour === 23 && endMinute === 59 ? `0%` : endWidth;

  const timelineColor = hex2rgba(color, 1);

  let startFrom;
  let interval;

  if (startIndex === endIndex) {
    startFrom = `${(startMinute % 10) * 10}%`;
    if (endHour === 23 && endMinute === 59) {
      interval = `${(endMinute - startMinute + 1) * 10}%`;
    } else {
      interval = `${(endMinute - startMinute) * 10}%`;
    }
  }

  return {
    startIndex,
    endIndex,
    color: timelineColor,
    startWidth,
    endWidth,
    startFrom,
    interval,
  };
};
