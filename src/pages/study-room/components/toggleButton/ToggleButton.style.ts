import styled from 'styled-components';

export const ToggleSwitch = styled.div`
  display: flex;
  width: 40px;
  height: 20px;
  position: relative;
  align-items: center;
`;

export const ToggleSwitchLabel = styled.label`
  display: flex;
  align-items: center;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 0;
  height: 0;
  opacity: 0;
  &:checked + span {
    background-color: ${({ theme }) => theme.color.mainStrong};
  }
  &:checked + span::before {
    transform: translateX(20px);
  }
`;

export const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 20px;
  transition: 0.4s;

  &::before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;
