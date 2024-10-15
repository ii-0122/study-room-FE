import styled from 'styled-components';

export const StatContainer = styled.div`
  border-radius: 12px;
  padding: 36px;
  margin: 40px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const AvgWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Avg = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px 34px;
  display: flex;
  gap: 14px;
  width: 600px;
`;

export const AvgTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const AvgLine = styled.div`
  margin-bottom: 4px;
`;

export const AvgSpan = styled.span`
  font-weight: bold;
  margin-left: 4px;
`;

export const AvgSub = styled.h4`
  font-size: 14px;
`;
