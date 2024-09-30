import styled from 'styled-components';

export const StudyRoomsStyle = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  width: 100%;

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
  }

  .header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
`;

export const MainContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: calc(100vh - 100px);
  width: 100%;
  overflow: auto;
`;
