import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Hashtag, Hashtags, ItemContainer, ItemContent, ItemFooter, ItemTitle, ParticipantCount, Privacy, StudyItemStyle, Title } from "./StudyItem.style";

interface StudyItemProps {
  title: string;
  imageUrl?: string;
  hashtags?: string[];
  isPublic: boolean;
  maxParticipants: number;
  currentParticipants: number;
};

function StudyItem({ title, imageUrl, hashtags = [], isPublic, maxParticipants, currentParticipants }: StudyItemProps) {
  return (
    <StudyItemStyle>
      <ItemContainer imageUrl={imageUrl}>
        <ItemContent>
          <Privacy>{isPublic ? <FaLockOpen /> : <FaLock />}</Privacy>
          <Title>{title}</Title>
          <ParticipantCount>
            <MdPerson />
            {currentParticipants}/{maxParticipants}
          </ParticipantCount>
        </ItemContent>
      </ItemContainer>
      <ItemFooter>
        <ItemTitle>{title}</ItemTitle>
        <Hashtags>
          {hashtags.map((hashtag, index) => (
            <Hashtag key={index}>#{hashtag}</Hashtag>
          ))}
        </Hashtags>
      </ItemFooter>
    </StudyItemStyle>
  );
};

export default StudyItem;