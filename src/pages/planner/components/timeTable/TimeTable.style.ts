import styled from 'styled-components';

export const TimeTableContainer = styled.div`
  display: grid;

  width: 368px;
  height: 746px;
  width: 70%;
  height: 100%;

  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(24, 1fr);

  border-left: 1px solid ${({ theme }) => theme.color.plannerGray};
  border-top: 1px solid ${({ theme }) => theme.color.plannerGray};

  .item {
    border-right: 1px solid ${({ theme }) => theme.color.plannerGray};
    border-bottom: 1px solid ${({ theme }) => theme.color.plannerGray};
  }

  .hours {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8vw;
    font-weight: 600;
    color: #595959;
  }
`;

export const SelectedTime = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['isStart', 'isEnd', 'color', 'startWidth', 'endWidth'].includes(prop),
})<{
  isStart?: boolean;
  isEnd?: boolean;
  color?: string;
  startWidth?: string;
  endWidth?: string;
}>`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color || 'gainsboro'};

  ${(props) =>
    props.isStart &&
    `
      width: calc(100% - ${props.startWidth || '0%'});
      margin-left : auto;
      background-color : ${props.color || 'gainsboro'}
    `}

  ${(props) =>
    props.isEnd &&
    `
    width: calc(100% - ${props.endWidth || '0%'});
    margin-right : auto;
    background-color : ${props.color || 'gainsboro'}
    `}
`;
