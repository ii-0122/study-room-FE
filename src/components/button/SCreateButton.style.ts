import styled from 'styled-components';

export const SCreateButtonStyle = styled.button.withConfig({
  shouldForwardProp: (prop) => !['borderRadius'].includes(prop),
})<{
  borderRadius?: string;
  fontSize?: string;
  width?: string;
  height?: string;
}>`
  color: white;
  border: none;
  background-color: ${({ theme }) => theme.color.mainStrong};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius || theme.borderRadius};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  position: relative;
  font-weight: 500;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .label {
    flex: 1;
    text-align: center;
  }
`;
