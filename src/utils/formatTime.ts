export const formatAverageTime = (hours: string, minutes: string) => {
  const formattedHours = parseInt(hours, 10);
  const formattedMinutes = parseInt(minutes, 10);
  return `${formattedHours}시간 ${formattedMinutes}분`;
};

export const formatHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}시간 ${minutes}분`;
};

export const formatHours = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  return `${hours}시간`;
};
