import styled from 'styled-components';

export const LegendContainer = styled.ul`
  display: flex;
  margin-left: auto;
  gap: 8px;
`;

export const LegendItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 6px;
`;

export const Line = styled.span<{ color?: string; $dashed?: boolean }>`
  display: inline-block;
  width: 14px;
  height: 2px;
  background-color: ${({ color, $dashed }) =>
    $dashed ? 'transparent' : color || 'black'};
  border-bottom: ${({ $dashed, color }) =>
    $dashed ? `1px dashed ${color}` : 'none'};
`;

export const ArrowGraphContainer = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
`;
