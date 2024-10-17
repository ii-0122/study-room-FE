import styled from 'styled-components';

export const StatContainer = styled.div`
  border-radius: 12px;
  padding: 36px;
  margin: 40px;
  height: 100%;
  width: 100%;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const AvgWrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
`;

export const Avg = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px 34px;
  display: flex;
  gap: 14px;
  width: 100%;
`;

export const AvgTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

export const AvgLine = styled.div`
  margin-bottom: 4px;
`;

export const AvgSpan = styled.span`
  font-weight: bold;
  margin-left: 18px;
`;

export const AvgSub = styled.h4`
  font-size: 14px;
`;
