import styled from 'styled-components';

export const SCreateButtonStyle = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['borderRadius', 'backgroundColor', 'borderColor'].includes(prop),
})<{
  borderRadius?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  border?: string;
  borderColor?: string;
  color?: string;
}>`
  color: ${({ color }) => color || 'white'};
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor}` : 'none'};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.color.mainStrong};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius || theme.borderRadius};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  position: relative;
  font-weight: 500;
  cursor: pointer;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
  }

  .label {
    flex: 1;
    text-align: center;
    white-space: nowrap;
    margin: 0;
  }
`;
