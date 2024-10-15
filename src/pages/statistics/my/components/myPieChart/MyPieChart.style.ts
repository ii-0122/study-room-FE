import styled from 'styled-components';

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-height: 360px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin: auto;
`;

export const ValueContainer = styled.div`
  display: flex;
  gap: 18px;
`;

export const ValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border: 1px solid lightgray;
  border-radius: 8px;
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

export const EmptyText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #555555;
  line-height: 1.5;
  text-align: center;
  margin-top: 100px;
`;

export const TooltipContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d3d3d3;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  text-align: center;
`;

export const TaskText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

export const TimeText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0 0 0;
`;
