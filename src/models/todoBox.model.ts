export interface ITodoBox {
  id: string;
  title?: string;
  detail: string;
  startTime?: string;
  endTime?: string;
  repeatDays?: string[];
  repeatWeeks?: string;
  index?: number;
  isChecked?: boolean;
  color?: string;
}
