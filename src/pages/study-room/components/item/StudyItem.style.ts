import styled from 'styled-components';

export const StudyItemStyle = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const ItemContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageUrl'].includes(prop),
})<{ imageUrl?: string }>`
  position: relative;
  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : '#E5E5E5'};
  background-size: cover;
  background-position: center;
  border-radius: 7px;
  overflow: hidden;
  width: auto;
  height: auto;
  min-width: 250px;
  min-height: 150px;

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

export const Privacy = styled.p`
  margin: 0;
  font-size: 1rem;
`;

export const ItemContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  z-index: 1;
  justify-content: space-between;
`;

export const TextWrap = styled.div`
  flex-direction: column;
  transform: translateY(calc(100% - 10px));
  padding: 10px 0;
`;

export const Title = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.1rem;
  padding-bottom: 5px;
`;

export const ParticipantCount = styled.p`
  font-size: 1.1rem;
`;

export const ItemFooter = styled.div`
  padding: 10px 2px;
`;

export const ItemTitle = styled.h4`
  font-size: 1rem;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 100%;
  line-height: 1.5;
`;

export const Hashtags = styled.div`
  padding-top: 7px;
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
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.mainStrong};
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #f1f1f1;
`;
