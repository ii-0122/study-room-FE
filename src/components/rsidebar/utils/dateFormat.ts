import dayjs from 'dayjs';

export const formatDateTime = (date?: string) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  if (date) {
    return dayjs(date).format(`YY.MM.DD.${daysOfWeek[dayjs(date).day()]}`);
  }

  return dayjs().format(`YY.MM.DD.${daysOfWeek[dayjs().day()]} - HH:mm`);
};

export const isWithinOneDay = (date: string) => {
  const today = dayjs().startOf('day');
  const targetDate = dayjs(date).startOf('day');

  const diffDays = targetDate.diff(today, 'day');

  return diffDays >= -1 && diffDays <= 1;
};
