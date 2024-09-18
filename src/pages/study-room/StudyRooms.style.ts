import styled from "styled-components";

export const StudyRoomsStyle = styled.div`
  display: flex;
  
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: 77px 0;
  }
`;

export const MainContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: calc(100vh - 100px);
  overflow: auto;
`;