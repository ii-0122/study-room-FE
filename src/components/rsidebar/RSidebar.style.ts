import styled from 'styled-components';

export const RSidebarStyle = styled.div`
  min-width: 350px;
  max-width: 350px;
  height: 100vh;
  background: ${({ theme }) => theme.color.main};
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 7%;
`;

export const CurrentTime = styled.div`
  color: #7c7c7c; // plannerTimeGray
  font-size: min(2rem, 2.5vh);
  font-weight: 600;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 70%;
  border-radius: 1rem;
  background-color: white;
`;

export const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.isSelected &&
    `font-weight:600; color : ${props.theme.color.mainStrong} ;`}
`;
