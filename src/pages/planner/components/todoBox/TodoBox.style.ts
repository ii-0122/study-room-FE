import styled from 'styled-components';

export const TodoBoxStyle = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color.bgLightGray};
  width: 641px;
  height: 98px;
  margin: 0px 5px 35px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export const ColorBarStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'barColor',
})<{ barColor?: string }>`
  margin-right: 20px;
  height: 100%;
  width: 11px;
  background-color: ${(props) => (props.barColor ? props.barColor : null)};
  border-radius: 8px;
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleStyle = styled.div`
  height: 24px;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;
export const DetailStyle = styled.div`
  font-size: 20px;
  font-weight: 400;
`;
