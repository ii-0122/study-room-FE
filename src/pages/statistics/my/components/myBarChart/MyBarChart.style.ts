import styled from 'styled-components';

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const ChartValueContainer = styled.div`
  display: flex;
  gap: 18px;
`;

export const ChartValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid lightgray;
  border-radius: 12px;
  padding: 16px;
  min-width: 160px;
`;

export const ValueTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: auto;
`;

export const ValueText = styled.p`
  font-size: 16px;
  margin: auto;
`;

export const BarContainer = styled.div`
  width: 100%;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  white-space: nowrap;
`;

export const IconWrapper = styled.span`
  font-size: 20px;
  margin-right: 5px;
  color: ${({ color }) => color};
`;

export const LabelWrapper = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

export const TickWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  white-space: nowrap;
`;
