import { forwardRef, Ref, SetStateAction, Dispatch } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from './DatePicker.style';

interface CustomInputProps extends React.HTMLProps<HTMLDivElement> {
  value?: string;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

interface CustomDatePickerProps {
  className?: string;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
  ({ value, onClick, setSelectedDate }, ref: Ref<HTMLDivElement>) => {
    const handlePreviousDate = () => {
      setSelectedDate((prev) => {
        const previousDate = new Date(prev);
        previousDate.setDate(previousDate.getDate() - 1);
        return previousDate;
      });
    };

    const handleNextDate = () => {
      setSelectedDate((prev) => {
        const nextDate = new Date(prev);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate;
      });
    };

    return (
      <S.PlannerInputWrapper>
        <IoIosArrowBack className="changeButton" onClick={handlePreviousDate} />
        <div className="datePickerInput" onClick={onClick} ref={ref}>
          {value}
        </div>
        <IoIosArrowForward className="changeButton" onClick={handleNextDate} />
      </S.PlannerInputWrapper>
    );
  }
);

export default function CustomDatePicker({
  className,
  selectedDate,
  setSelectedDate,
}: CustomDatePickerProps) {
  return (
    <DatePicker
      wrapperClassName={className}
      locale={ko}
      selected={selectedDate}
      dateFormatCalendar="YYYY년 MMMM"
      dateFormat="yyyy.MM.dd (EE)"
      onChange={(date) => {
        if (date) {
          setSelectedDate(date);
        }
      }}
      customInput={<CustomInput setSelectedDate={setSelectedDate} />}
    />
  );
}
