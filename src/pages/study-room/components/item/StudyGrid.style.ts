import styled from 'styled-components';

export const StudyGridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 226px);
  grid-auto-rows: 240px;
  gap: 25px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 520px;
  padding-right: 20px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: ${({ theme }) => theme.borderRadius.large};
  }
`;

export const ScrollContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingIndicator = styled.div`
  grid-column: span 4;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
`;
