import styled from 'styled-components';
import { PiCrownSimpleFill } from 'react-icons/pi';

export const BoardContainer = styled.div`
  display: flex;
  width: 25vw;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const BoardAndInformWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 3%;
`;

export const InformText = styled.div`
  font-size: max(0.8rem, 1vw);
  color: ${({ theme }) => theme.color.labelGray};
`;

export const BoardWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bgColor'].includes(prop),
})<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  height: 80%;
  border: 1px solid black;
  border-radius: 0.8rem;
  background-color: ${(props) => props.bgColor};
  box-shadow: 2px 2px 4px 1px rgb(0 0 0 / 20%);
`;

export const Title = styled.div`
  font-size: max(1rem, 1.2vw);
  font-weight: 600;
`;

export const ContentWrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  display: grid;
  grid-template-columns: 2fr 4fr 4fr;
  grid-template-rows: 1fr repeat(10, 1fr) 1fr;

  /* align-items: center; */
  width: 90%;
  height: 90%;
  background-color: white;
  border-radius: 0.8rem;
  border: 2px dotted ${({ theme }) => theme.color.bgGray};

  .header {
    /* font-size : 1rem; */
    font-weight: 600;
  }

  .myRank {
    grid-column: 1/2;
    grid-row: 12/13;
  }

  .myNickname {
    grid-column: 2/3;
    grid-row: 12/13;
  }

  .myStudyTime {
    grid-column: 3/4;
    grid-row: 12/13;
  }
`;

export const GridItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isMine'].includes(prop),
})<{ isMine?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: max(0.5rem, 0.8vw);

  &:nth-child(3n + 2):nth-child(n + 4) {
    border-left: 1px solid ${({ theme }) => theme.color.bgGray};
    border-right: 1px solid ${({ theme }) => theme.color.bgGray};
  }

  &:nth-child(3n + 1):nth-child(n + 4) {
    font-size: max(0.5rem, 1vw);
  }
  &:nth-child(3n + 3):nth-child(n + 4) {
    font-size: max(0.5rem, 0.9vw);
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    font-size: max(0.5rem, 0.9vw);
  }

  &:nth-last-child(1),
  &:nth-last-child(2),
  &:nth-last-child(3) {
    border-top: 1px solid black;
  }

  ${(props) =>
    props.isMine
      ? `background-color : ${props.theme.color.main}`
      : 'background-color : white'}
`;

export const CrownWrapper = styled.div`
  position: relative;
  width: 2em;
  height: 2em;
`;

export const CrownIcon = styled(PiCrownSimpleFill).withConfig({
  shouldForwardProp: (prop) => prop !== 'rank',
})<{ rank?: number }>`
  position: absolute;
  width: 2em;
  height: 2em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) =>
    props.rank === 1 ? '#FFD700' : props.rank === 2 ? '#C0C0C0' : '#CD7F32'};
`;

export const CrownText = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 10;
  font-size: 0.8em;
  font-weight: 600;
`;
