import styled from 'styled-components';

export const TimeLineWrapper = styled.div`
  font-size: max(0.8vw, 14px);
  /* font-size: 16px; */

  position: absolute;

  left: -88px;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    background-color: ${({ theme }) => theme.color.mainStrong};
    border-radius: 50%;
    top: 0px;
    left: 50px;
  }

  text-align: center;
`;

export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StartTime = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;
export const EndTime = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.color.plannerTimeGray};
`;
