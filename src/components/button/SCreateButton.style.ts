import { ButtonSize } from "@/styles/theme";
import styled from "styled-components";

export const SCreateButtonStyle = styled.button.withConfig({
  shouldForwardProp: (prop) => !['borderRadius'].includes(prop)
  })<{ size: ButtonSize; borderRadius?: string; fontSize?: string; }>`
  color: white;
  border: none;
  background-color: ${({ theme }) => theme.color.mainStrong};
  width: ${({ theme, size }) => theme.studyRoomButton[size].width};
  height: ${({ theme, size }) => theme.studyRoomButton[size].height};
  border-radius: ${({ theme, borderRadius }) => borderRadius || theme.borderRadius};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  position: relative;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .label {
    flex: 1; 
    text-align: center;
    padding-right: 20px;
  }
`;