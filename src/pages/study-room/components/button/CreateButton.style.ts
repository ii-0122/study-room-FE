import styled from 'styled-components';

export const CreateButtonStyle = styled.div<{ marginRight?: string }>`
  display: flex;
  margin-right: ${({ marginRight }) => marginRight};
`;
