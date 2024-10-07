import styled from 'styled-components';

export const StudyRoomsStyle = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  width: calc(100vw - 240px);
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  flex: 1;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding-right: 25px;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 0;
  padding-right: 25px;
`;
