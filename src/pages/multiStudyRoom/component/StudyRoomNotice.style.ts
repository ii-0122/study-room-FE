import styled from 'styled-components';

export const StudyRoomNoticeStyle = styled.div`
  display: flex;
  position: absolute;
  background-color: #ffdada;
  width: 100%;
  padding: 24px;
  top: 80px;
  z-index: 15;
`;

export const NoticeDivOpen = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  left: 0;
`;

export const NoticeDivClosed = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const OpenText = styled.div`
  width: 100%;
  height: auto;
  white-space: normal;
  font-size: 1.2rem;
`;

export const CloseText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  flex: 1;
`;
