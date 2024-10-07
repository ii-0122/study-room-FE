import styled from 'styled-components';

export const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const BoardsArea = styled.div`
  display: flex;
  height: 100%;
`;

export const Notice = styled.div`
  display: flex;
  justify-content: center;
  font-size: max(1rem, 1.2vw);
  color: ${({ theme }) => theme.color.labelGray};
  /* padding-bottom: 20px; */
`;
