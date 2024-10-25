import styled from 'styled-components';

export const PlannerInputWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;

  .datePickerInput {
    margin: 0px 30px;
    &:hover {
      background-color: #e0e0e0;
      cursor: pointer;
    }
  }

  .changeButton {
    &:hover {
      cursor: pointer;
    }
  }
`;
