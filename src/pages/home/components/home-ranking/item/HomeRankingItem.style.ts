import styled from 'styled-components';

export const RankingItemStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 40px;
`;

export const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const List = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isTop10'].includes(prop),
})<{ isTop10?: boolean }>`
  display: grid;
  grid-template-rows: ${({ isTop10 }) =>
    isTop10 ? 'repeat(10, 1fr)' : 'repeat(3, 1fr)'};
  width: 100%;
  height: 100%;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  background-color: white;
`;

export const RankItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCurrentUser'].includes(prop),
})<{ isCurrentUser?: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${({ isCurrentUser }) =>
    isCurrentUser ? '#ddebfd' : 'transparent'};
`;

export const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const Rank = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDayList'].includes(prop),
})<{ isDayList?: boolean }>`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: center;
  font-size: ${({ isDayList }) => (isDayList ? '1.5rem' : '1rem')};

  img {
    width: 2.5vw;
    height: 2.5vw;
    justify-content: center;
    align-items: center;
  }
`;

export const NickName = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
`;

export const TotalTime = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
`;

export const NoUserMessage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 0.9vw;
  color: ${({ theme }) => theme.color.plannerTimeGray};
`;
