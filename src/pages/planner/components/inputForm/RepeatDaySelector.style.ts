import styled from 'styled-components';

export const DaySelectWrapper = styled.div`
  display: flex;
  gap: max(0.5vw, 0.3rem);
  margin-right: 10px;
  margin-bottom: 8px;
`;

export const DaySelectInput = styled.input`
  display: none;

  + label {
    content: '';
    display: flex;
    font-size: max(0.6rem, 0.9vw) !important;
    width: max(20px, 2em);
    height: max(20px, 2em);

    background-color: #e8e8e8;
    font-weight: 600;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  &:checked + label {
    background-color: #ffbf60;
    color: white;
    border-color: black;
  }
`;
