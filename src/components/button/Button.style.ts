import styled from 'styled-components';

const sizeStyles = {
  small: {
    padding: '6px 12px',
    fontSize: '12px',
  },
  medium: {
    padding: '8px 16px',
    fontSize: '14px',
  },
  large: {
    padding: '12px 24px',
    fontSize: '18px',
  },
};

export const StyledButton = styled.button<{
  size: 'small' | 'medium' | 'large';
}>`
  background-color: ${({ theme }) => theme.color.mainStrong};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  padding: ${({ size }) => sizeStyles[size].padding};
  font-size: ${({ size }) => sizeStyles[size].fontSize};

  &:hover {
    background-color: ${({ theme }) => theme.color.btnOk};
  }
`;
