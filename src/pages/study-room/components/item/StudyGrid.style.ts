import styled from 'styled-components';

export const StudyGridStyle = styled.div`
  display: grid;
  gap: 30px;
  overflow-y: auto;
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

export const LoadingIndicator = styled.div`
  grid-column: span 4;
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 1rem;
`;
