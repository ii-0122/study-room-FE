import styled from 'styled-components';

export const Radio = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RadioButton = styled.input.attrs({ type: 'radio' })`
  margin-right: 5px;
`;

export const RadioLabel = styled.label`
  font-size: 14px;
`;
