import styled from 'styled-components';

export const StudyItemStyle = styled.div`
  width: 328px;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

export const ItemContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageUrl'].includes(prop),
})<{ imageUrl?: string }>`
  position: relative;
  width: 100%;
  height: 207px;
  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : '#E5E5E5'};
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
`;

export const ItemContent = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  color: white;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  margin: 0;
  padding-top: 70px;
  font-size: 25px;
`;

export const ParticipantCount = styled.p`
  margin: 10px 0;
  font-size: 25px;
`;

export const Privacy = styled.p`
  margin: 0;
  padding-top: 10px;
  font-size: 25px;
`;

export const ItemFooter = styled.div`
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ItemTitle = styled.h4`
  margin: 0;
  font-size: 18px;
`;

export const Hashtags = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
`;

export const Hashtag = styled.span`
  margin-right: 5px;
  font-size: 18px;
  color: ${({ theme }) => theme.color.plannerTimeGray};
  font-style: italic;
`;
