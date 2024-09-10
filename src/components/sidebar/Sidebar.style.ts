import styled from 'styled-components';

export const SidebarStyle = styled.div`
  /* background-color: ${(props) => props.theme.color.main}; */
  background-color: ${({ theme }) => theme.color.main};
  width: 300px;
  height: 100vh;
`;
