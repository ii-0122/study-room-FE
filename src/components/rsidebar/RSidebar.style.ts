import styled from 'styled-components';

export const RSidebarStyle = styled.div`
  display: flex;
  min-width: 350px;
  height: 100vh;
  background: ${({ theme }) => theme.color.main};
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: auto;
`;

export const CurrentTime = styled.div`
  color: #7c7c7c; // plannerTimeGray
  font-size: 28px;
  font-weight: 600;
`;

export const ContentWrapper = styled.div`
  width: 287px;
  height: 600px;
  border-radius: 10px;
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
  font-size: 20px;

  color: ${(props) => (props.isSelected ? 'black' : '#7c7c7c')};
  text-align: center;
  width: auto;
  border-radius: 8px;
  padding: 10px 0;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.isSelected &&
    `font-weight:600; color : ${props.theme.color.mainStrong} ;`}
`;
