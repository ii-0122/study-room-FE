import styled from 'styled-components';

export const CheckBoxStyle = styled.div`
  display: flex;
  align-items: center;

  input {
    position: relative;
    appearance: none;
    min-width: 16px;
    min-height: 16px;
    margin: 0;
    border-radius: 4px;
    cursor: pointer;
    background-color: #f1f1f1;
    border: 1px solid ${({ theme }) => theme.color.plannerGray};

    &:checked {
      background-color: ${({ theme }) => theme.color.mainStrong};
      border: 1px solid #2b81ff;
    }

    &:checked::after {
      position: absolute;
      content: '✔';
      color: white;
      font-size: 10px;
      left: 2px;
      top: 2px;
    }
  }

  label {
    font-size: 14px;
    white-space: nowrap;
    margin-left: 7px;
  }
`;
