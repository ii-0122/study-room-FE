import styled from 'styled-components';

export const TimeTableContainer = styled.div`
  display: grid;
  flex: 1;

  width: 18vw;

  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(24, 1fr);

  border-left: 1px solid ${({ theme }) => theme.color.plannerGray};
  border-top: 1px solid ${({ theme }) => theme.color.plannerGray};
`;

export const Cell = styled.div`
  border-right: 1px solid ${({ theme }) => theme.color.plannerGray};
  border-bottom: 1px solid ${({ theme }) => theme.color.plannerGray};
  background-color: white;
  position: relative;
`;

export const HourCell = styled(Cell)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9vw;
  font-weight: 600;
  color: #595959;
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
  position: absolute;

  background-color: ${(props) => props.color || 'gainsboro'};

  ${(props) =>
    props.isStart &&
    `
      width: calc(100% - ${props.startWidth || '0%'});
      right : 0;
    `}

  ${(props) =>
    props.isEnd &&
    `
    width: calc(100% - ${props.endWidth || '0%'});
    left : 0;

    `}
`;

export const SelectedTimeline = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'isStart',
      'isEnd',
      'color',
      'startWidth',
      'endWidth',
      'startFrom',
      'interval',
      'planColor',
    ].includes(prop),
})<{
  isStart?: boolean;
  isEnd?: boolean;
  color?: string;
  startWidth?: string;
  endWidth?: string;

  startFrom?: string;
  interval?: string;
  planColor?: string;
}>`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  background-color: ${(props) => props.color || 'white'};

  /* background-image: repeating-linear-gradient(
    135deg,
    ${(props) => props.color} 0px,
    ${(props) => props.color} 5px,
    transparent 5px,
    transparent 10px
  ); */

  /* border: 1px solid black; */

  ${(props) =>
    props.startFrom &&
    props.interval &&
    `
      left: ${props.startFrom};
      width: ${props.interval};
    `}

  ${(props) =>
    props.isStart &&
    `
      width: calc(100% - ${props.startWidth || '0%'});
      right : 0;

    `}

  ${(props) =>
    props.isEnd &&
    `
    width: calc(100% - ${props.endWidth || '0%'});
    left : 0;


    `}
`;
