import styled from "styled-components";

export const SelectBoxStyle = styled.div`
  display: flex;
  
  .select-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: 64px;
    margin-left: 15px;

    select {
      border: none;
      appearance: none;
      box-sizing: border-box;
			outline: none;
      background: transparent;
      width: 100%;
      height: 100%;
      font-size: 20px;
      text-align: center;
    }

    .triangle {
      position: relative;
      font-size: 18px;
      color: ${({ theme }) => theme.color.plannerGray};
    }
  }

  select option {
    background: ${({ theme }) => theme.color.bgLightGray}; 
    font-size: 18px;
    border-radius: 4px;
    border-color: #E4E4E4;
  }
`;