import styled from 'styled-components';

export const RSidebarStyle = styled.div`
  min-width: 600px;
  height: 100vh;
  background: ${({ theme }) => theme.color.main};
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

export const CurrentTime = styled.div`
  color: #7c7c7c; // plannerTimeGray
  font-size: 36px;
  font-weight: 600;
`;

export const ContentWrapper = styled.div`
  width: 494px;
  height: 750px;
  border-radius: 15px;
  background-color: white;
  margin: 8px 0px;
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
  font-size: 36px;

  color: ${(props) => (props.isSelected ? 'black' : '#7c7c7c')};
  text-align: center;
  width: 120px;
  border-radius: 8px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.isSelected &&
    `font-weight:600; color : ${props.theme.color.mainStrong} ;`}
`;
