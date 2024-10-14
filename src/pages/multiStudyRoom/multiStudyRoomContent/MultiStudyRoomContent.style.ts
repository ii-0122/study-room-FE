import styled from 'styled-components';

export const MultiStudyRoomStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100vh;
`;

export const StudyRoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  margin: 60px 0;
`;

export const UserProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  height: 50vh;
  max-width: 70vw;
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const InstructionText = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 564px;
`;

export const RSideBarStyle = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%); /* 수직 중앙 정렬 */
`;
