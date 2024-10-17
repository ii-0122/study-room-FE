import styled from 'styled-components';

export const HomeStudyItemStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageUrl'].includes(prop),
})<{ imageUrl?: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : `#FFFFFF`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  border: 1px solid;
  border-color: #e4e4e4;

  ${(props) =>
    props.imageUrl &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.07);
      border-radius: 5px;
      z-index: 0;
    }
  `};
`;

export const ItemContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageUrl'].includes(prop),
})<{ imageUrl?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: ${(props) => (props.imageUrl ? `#FFFFFF` : `#000000`)};
  z-index: 1;

  height: 100%;
  justify-content: space-between;
`;

export const Title = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const IconWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Privacy = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`;

export const Chat = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;

export const ParticipantCount = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;
