import styled from 'styled-components';

export const StyledFormInput = styled.input`
  border: none;
  min-width: 240px;
  width: 100%;
  font-size: 14px;
  padding: 4px;

  &[type='file'] {
    display: none;
  }

  &::placeholder {
    color: #989898;
  }
`;
