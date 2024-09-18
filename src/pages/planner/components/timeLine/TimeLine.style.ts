import styled from 'styled-components';

export const TimeLineWrapper = styled.div`
  font-size: 20px;

  position: absolute;

  left: -105px;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    background-color: ${({ theme }) => theme.color.mainStrong};
    border-radius: 50%;
    top: 0px;
    left: 70px;
  }
`;

export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StartTime = styled.div`
  font-weight: 600;
`;
export const EndTime = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.color.plannerTimeGray};
`;
