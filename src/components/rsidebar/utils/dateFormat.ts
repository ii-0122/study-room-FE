import dayjs from 'dayjs';

export const formatDateTime = (date?: string) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  if (date) {
    return dayjs(date).format(`YY.MM.DD.${daysOfWeek[dayjs().day()]}`);
  }

  return dayjs().format(`YY.MM.DD.${daysOfWeek[dayjs().day()]} - HH:mm`);
};
