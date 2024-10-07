import styled, { css } from 'styled-components';
import { LuCalendarDays } from 'react-icons/lu';

export const InputFormStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const TextInputBox = styled.input`
  padding: 0 1em;
  width: 100%;
  height: 1.8em;
  border-radius: 0.5em;
  border: ${({ theme }) => `1px solid ${theme.color.plannerGray}`};
  font-size: max(0.5rem, 1vw);
`;

export const ErrorText = styled.span`
  font-size: max(0.6rem, 0.6vw);
  color: red;
  font-weight: 600;
`;

export const Label = styled.label`
  font-size: max(1rem, 1.1vw);
  font-weight: 600;
  margin-right: 15px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.bgLightGray};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  justify-content: center;
  padding: 4%;
  gap: 15px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TodoArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Time = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const InputTimeWrapper = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
  width: 100%;
`;

export const TimeLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Hyphen = styled.div`
  margin-top: calc(max(0.9rem, 0.8vw) + 15px);
  width: 8px;
  height: 3px;
  background-color: black;
`;

export const SubLabel = styled.label`
  font-size: max(0.9rem, 0.8vw);
  font-weight: 600;
  color: ${({ theme }) => theme.color.plannerTimeGray};
  margin-bottom: 5px;
`;

export const InputTimeStyle = styled.input`
  font-size: max(0.8rem, 0.8vw);

  height: 2em;
  width: 10em;
  text-align: center;
  border-radius: 8px;

  border: ${({ theme }) => `1px solid ${theme.color.plannerGray}`};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.plannerGray};
  }
`;

export const Repeat = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 3px;
`;

export const SaveDelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  margin-left: auto;
  position: relative;
  margin-top: auto;
`;

const SaveAndDelButton = css`
  background-color: white;
  border: ${({ theme }) => `1px solid ${theme.color.plannerGray}`};
  border-radius: 8px;
  font-size: max(0.7rem, 1vw);
  width: 6em;
  height: 2em;
  color: ${({ theme }) => theme.color.plannerTimeGray};
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.plannerGray};
  }
`;

export const SaveButton = styled.button`
  ${SaveAndDelButton}
  &:disabled {
    background-color: lightgray;
    color: darkgray;
    cursor: not-allowed;
  }
`;

export const DisabledInform = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDisabled'].includes(prop),
})<{ isDisabled?: boolean }>`
  display: none;
  width: 11em;
  font-size: max(0.6rem, 0.7vw);
  top: -5%;
  left: -15%;
  border: 1px solid black;
  background-color: white;
  padding: 0.5em;
  position: absolute;
  line-height: 1.3em;
  ${SaveButton}:hover + & {
    display: ${(props) => props.isDisabled && 'flex'};
  }
`;

export const DelButton = styled.button`
  ${SaveAndDelButton}
  background-color : #ff6253;
  color: white;

  &:hover {
    background-color: #ff958b;
  }
`;

export const Footer = styled.div`
  display: flex;
`;

export const StyledDatePicker = styled.div`
  input {
    font-size: max(0.7rem, 0.8vw);
    padding-left: 1.8em;
    border-radius: 0.5em;
    border: ${({ theme }) => `1px solid ${theme.color.plannerGray}`};
    &:hover {
      cursor: pointer;
    }
    width: 77%;
  }

  input::placeholder {
    font-size: max(0.5rem, 0.6vw);
  }

  .react-datepicker__close-icon {
    position: absolute;
    top: 5%;
    right: 22%;
  }

  .react-datepicker__close-icon::after {
    cursor: pointer;
    background-color: gray;
    color: #fff;
    border-radius: 50%;
    height: 1.2em;
    width: 1.2em;
    padding: 0px;
    font-size: max(0.5rem, 0.7vw);
    line-height: 1;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    content: '×';
  }

  .react-datepicker__input-container .react-datepicker__calendar-icon {
    position: absolute;
    padding: 0.5rem;
    box-sizing: content-box;
    top: 5%;
  }
`;

export const CalendarIcon = styled(LuCalendarDays)`
  font-size: max(0.5rem, 0.7vw);
`;
