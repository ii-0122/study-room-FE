import styled from 'styled-components';

export const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const BoardsArea = styled.div`
  display: flex;
  height: 90%;
  width: 100%;
  justify-content: space-evenly;
`;

export const Notice = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: max(1rem, 1.2vw);
  color: ${({ theme }) => theme.color.labelGray};
`;
