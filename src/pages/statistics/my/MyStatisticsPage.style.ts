import styled from 'styled-components';

export const StatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px;
  gap: 100px;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  padding: 36px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const StatWrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-width: 550px;
  gap: 12px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: end;
`;

export const Button = styled.button<{ $isActive: boolean }>`
  background: none;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    outline: none;
    border-color: ${theme.color.mainStrong};
    color: ${theme.color.mainStrong};
  `}

  &:hover {
    border-color: ${({ theme }) => theme.color.mainStrongHover};
    color: ${({ theme }) => theme.color.mainStrongHover};
  }
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 12px;
  padding: 18px;
  width: 100%;
  gap: 16px;
`;

export const ChartTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  margin: auto;
  display: flex;
  gap: 16px;
  padding: 20px;
`;

export const ArrowButton = styled.div`
  cursor: pointer;
`;
