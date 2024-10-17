import styled from 'styled-components';

export const MultiStudyRoomContentStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const MainContentArea = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
`;

export const StudyRoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 30px;
`;

export const SettingIconWrapper = styled.div<{ $isNoticeEmpty: boolean }>`
  position: absolute;
  left: 10px;
  top: ${({ $isNoticeEmpty }) => ($isNoticeEmpty ? '100px' : '160px')};
  width: 100%;
  height: auto;
  z-index: 10;
`;

export const UserProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  height: 70%;
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
