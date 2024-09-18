import styled from 'styled-components';

export const HeaderStyle = styled.div`
  background-color: white;
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.lineGray};
`;
