import styled from 'styled-components';

export const HomeRankingStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9f9;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  flex-direction: row;
`;

export const Text = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.plannerGray};
  font-size: 1.7rem;
  font-weight: 600;
`;
