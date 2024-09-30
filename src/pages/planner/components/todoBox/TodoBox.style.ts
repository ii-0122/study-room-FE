import styled from 'styled-components';

export const TodoBoxStyle = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color.bgLightGray};
  width: 100%;
  height: 100%;
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
  min-width: min(0.6vw, 11px);
  background-color: ${(props) => (props.barColor ? props.barColor : null)};
  border-radius: 8px;
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  margin-right: 3%;
`;

export const TodoStyle = styled.div`
  font-size: clamp(0.8rem, 1.2vw, 1.3rem);
  font-weight: 600;
`;
export const SubjectStyle = styled.div`
  font-size: clamp(0.8rem, 1.1vw, 1.2rem);
`;

export const CheckBoxArea = styled.div`
  margin-left: auto;
  margin-right: 5%;
`;
