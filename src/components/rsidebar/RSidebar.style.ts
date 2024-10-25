import styled, { keyframes } from 'styled-components';
import { BsFillBellFill, BsBellSlashFill } from 'react-icons/bs';
export const RSidebarStyle = styled.div`
  min-width: 350px;
  max-width: 350px;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.main};
  justify-content: center;
  padding: 2% 0%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 7%;
  gap: 3%;
`;

export const CurrentTime = styled.div`
  color: #7c7c7c; // plannerTimeGray
  font-size: min(2rem, 2.5vh);
  font-weight: 600;
`;

export const ContentConfigsWrapper = styled.div`
  width: 100%;
  height: 82%;
`;

export const ConfigsWrapper = styled.div`
  display: flex;
  font-size: max(0.9rem, 0.9vw);
  height: 2em;
  align-items: center;
  justify-content: end;
`;

export const NotificationConfig = styled.div`
  width: 8.5em;
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  background-color: white;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.bgGray};

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }
`;

export const BellIcon = styled(BsFillBellFill)`
  color: rgba(255, 162, 0, 0.8);
`;
export const SlashBellIcon = styled(BsBellSlashFill)`
  color: rgba(255, 162, 0, 0.8);
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: white;
`;

export const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const Tab = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected'].includes(prop),
})<{ isSelected?: boolean }>`
  font-size: min(3vh, 3rem);

  color: ${(props) => (props.isSelected ? 'black' : '#7c7c7c')};
  text-align: center;
  width: 30%;
  border-radius: 8px;
  padding: min(1vh, 1rem);
  position: relative;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.isSelected &&
    `font-weight:600; color : ${props.theme.color.mainStrong} ;`}
`;

const blink = keyframes`
0%, 10% {
  opacity: 0;
}
20%, 90% {
  opacity : 1;
}
100% {
  opacity: 0;
}
`;
export const newChatAlert = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  right: 10px;
  background-color: red;
  animation: ${blink} 3s infinite;
`;
