import styled, { css } from 'styled-components';

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
  font-size: max(0.8rem, 0.9vw);
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
`;

export const TimeLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.plannerTimeGray};
  /* background-color: red; */
`;

export const Hyphen = styled.div`
  margin-top: 35px;
  width: 8px;
  height: 3px;
  background-color: black;
`;

export const TimeLabel = styled.label`
  font-size: max(0.9rem, 0.8vw);
  font-weight: 600;
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
`;

export const DaysWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const WeekWrapper = styled.div``;

export const WeekInput = styled.input`
  width: max(15px, 1.3vw);
  height: max(15px, 1.3vw);
  text-align: center;

  &:focus {
    outline: none;
  }

  + label {
    font-size: max(0.5rem, 0.8vw);
    margin-left: 5px;
    font-weight: 600;
    width: 4em;
  }
`;

export const SaveDelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  margin-left: auto;
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
