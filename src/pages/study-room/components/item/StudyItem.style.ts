import styled from 'styled-components';

export const StudyItemStyle = styled.div`
  width: 226px;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const ItemContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageUrl'].includes(prop),
})<{ imageUrl?: string }>`
  position: relative;
  width: 100%;
  height: 142px;
  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : '#E5E5E5'};
  background-size: cover;
  background-position: center;
  border-radius: 7px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    z-index: 0;
  }
`;

export const ItemContent = styled.div`
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 10px 10px;
  z-index: 1;
`;

export const Title = styled.h3`
  margin: 0;
  padding-top: 65px;
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const ParticipantCount = styled.p`
  margin: 5px 0;
  font-size: 17px;
`;

export const Privacy = styled.p`
  margin: 0;
  font-size: 15px;
`;

export const ItemFooter = styled.div`
  margin: 10px 2px;
`;

export const ItemTitle = styled.h4`
  font-size: 16px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 100%;
  line-height: 23px;
`;

export const Hashtags = styled.div`
  margin-top: 7px;
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  cursor: grab;
  user-select: none; // 텍스트 선택 방지

  &::-webkit-scrollbar {
    display: none;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &:active {
    cursor: grabbing;
  }
`;

export const Hashtag = styled.span`
  margin-right: 5px;
  font-size: 13px;
  color: ${({ theme }) => theme.color.mainStrong};
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #f1f1f1;
`;
