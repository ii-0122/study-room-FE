import styled from 'styled-components';

export const SelectBoxStyle = styled.div`
  display: flex;

  .select-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    height: auto;

    select {
      border: none;
      appearance: none;
      box-sizing: border-box;
      outline: none;
      background: transparent;
      width: 100%;
      height: 100%;
      font-size: 14px;
      text-align: center;
    }

    .triangle {
      position: relative;
      font-size: 14px;
      color: ${({ theme }) => theme.color.plannerGray};
      margin-left: 5px;
    }
  }

  select option {
    background: ${({ theme }) => theme.color.bgLightGray};
    font-size: 14px;
    border-radius: 4px;
    border-color: #e4e4e4;
  }
`;
