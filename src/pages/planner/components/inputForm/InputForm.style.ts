import styled, { css } from 'styled-components';

export const InputFormStyle = styled.div`
  margin-bottom: 35px;

  label {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  input {
    margin-bottom: 12px;
  }

  .textInputBox {
    padding-left: 16px;
    width: 565px;
    height: 39px;
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.color.plannerGray}`};
  }

  .label-error {
    display: flex;
  }

  .errorText {
    font-size: 15px;
    color: red;
    margin-left: 15px;
    font-weight: 600;
  }

  .repeatError {
    margin-left: auto;
    margin-right: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 641px;
  height: 415px;
  background-color: ${({ theme }) => theme.color.bgLightGray};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  margin: 0px 5px 5px;
  padding-left: 30px;
  justify-content: center;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Time = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  .startTime,
  .endTime {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.color.plannerTimeGray};
  }

  label {
    font-size: 16px;
    font-weight: 500px;
  }

  .hyphen {
    margin-top: 15px;
    width: 8px;
    height: 3px;
    background-color: black;
  }
`;

export const InputTimeStyle = styled.input`
  height: 40px;
  width: 140px;
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
  flex-direction: column;
`;

export const DaysWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const WeekInput = styled.input`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  text-align: center;

  &:focus {
    outline: none;
  }

  + label {
    font-size: 16px;
  }
`;

export const SaveDelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-top: auto;
  gap: 5px;
`;

const SaveAndDelButton = css`
  background-color: white;
  border: ${({ theme }) => `1px solid ${theme.color.plannerGray}`};
  border-radius: 8px;
  width: 108px;
  height: 40px;
  font-size: 16px;
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
