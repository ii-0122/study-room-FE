import styled from 'styled-components';

export const SelectBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Select = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  background: transparent;
  border: none;
`;

export const Arrow = styled.div`
  transform: rotate(90deg);
  margin-right: 7px;
`;

export const SelectedLabel = styled.span`
  flex: 1;
  text-align: right;
  white-space: nowrap;
  font-size: 14px;
`;

export const Options = styled.div`
  position: absolute;
  padding: 10px 0;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${({ theme }) => theme.color.plannerGray};
  border-radius: 4px;
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
`;

export const Option = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.mainStrong : 'inherit'};

  &:hover {
    background: ${({ theme }) => theme.color.bgLightGray};
    color: ${({ theme }) => theme.color.mainStrong};
  }
`;
