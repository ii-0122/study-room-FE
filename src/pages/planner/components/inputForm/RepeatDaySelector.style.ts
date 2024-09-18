import styled from 'styled-components';

export const DaySelectInput = styled.input`
  display: none;

  + label {
    content: '';
    display: flex;
    width: 40px;
    height: 40px;
    background-color: #e8e8e8;
    font-size: 14px;
    font-weight: 600;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 12px;
  }

  &:checked + label {
    background-color: #ffbf60;
    color: white;
    border-color: black;
  }
`;
