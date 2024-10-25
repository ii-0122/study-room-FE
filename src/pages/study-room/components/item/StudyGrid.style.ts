import styled from 'styled-components';

export const StudyGridItem = styled.div`
  display: grid;
  gap: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 20px;
  box-sizing: border-box;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: ${({ theme }) => theme.borderRadius.large};
  }

  &:has(::-webkit-scrollbar) {
    padding-right: 25px;
  }
`;

export const NoData = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.plannerGray};
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  overflow: hidden;
`;

export const ErrorMessage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.btnWarn};
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  overflow: hidden;
`;
