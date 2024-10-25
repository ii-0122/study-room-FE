import styled from 'styled-components';
import { TbCalendarRepeat } from 'react-icons/tb';

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
  gap: 3%;
`;

export const ColorBarStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'barColor',
})<{ barColor?: string }>`
  height: 100%;
  min-width: min(0.6vw, 11px);
  background-color: ${(props) =>
    props.barColor ? props.barColor : 'gainsboro'};
  border-radius: 8px;
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
`;

export const TodoStyle = styled.div`
  font-size: clamp(0.8rem, 1.2vw, 1.3rem);
  font-weight: 600;
  margin-top: 0.3em;
`;
export const SubjectStyle = styled.div`
  font-size: clamp(0.8rem, 1.1vw, 1.2rem);
`;

export const CheckBoxArea = styled.div`
  margin-left: auto;
  margin-right: 4%;
`;

export const RepeatContainer = styled.div`
  font-size: max(0.8vw, 0.5rem);
  color: gray;
  display: flex;
  align-items: center;
`;

export const RepeatIcon = styled(TbCalendarRepeat)`
  font-size: max(0.8vw, 1rem);
  margin-right: 10px;
`;
