import { scrollMixin } from '@/styles/mixins';
import styled, { css } from 'styled-components';
import { MdCancel, MdEdit } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: min(2vh, 20px) 0;
`;

export const DateWrapper = styled.div`
  display: flex;
  font-size: min(2.5vh, 40px);

  justify-content: space-around;
  align-items: center;
  font-weight: 600;
  width: 100%;
`;

export const DateBox = styled.div``;

export const DateArrow = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const TodosArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 100%;
  padding: 0 6px;
  ${scrollMixin.customScrollbar()}
`;

export const TodoBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected'].includes(prop),
})<{ isSelected?: boolean }>`
  display: flex;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;

  align-items: center;
  padding: 0px 10px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.main};
  }

  ${(props) =>
    props.isSelected
      ? `background-color: ${props.theme.color.main}; 
      border: 1px solid ${props.theme.color.mainStrong};`
      : 'white'}
`;

const TodoTextStyle = css`
  margin-left: 20px;
  font-size: 1.3rem;
`;

export const TodoTextArea = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isChecked'].includes(prop),
})<{ isChecked: boolean | undefined }>`
  ${TodoTextStyle}
  ${(props) => props.isChecked && 'text-decoration : line-through;'}
`;

export const TodoEditIcon = styled(MdEdit)`
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: 3px;
  align-items: center;
  margin-left: auto;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    filter: opacity(50%);
  }
`;

export const TodoSaveButton = styled.button`
  border: none;
  background-color: transparent;
  margin-left: auto;
  flex-shrink: 0;
  font-size: 20px;
  width: 1em;
  height: 1em;

  &:hover {
    cursor: pointer;
  }
`;

export const TodoSaveIcon = styled(FaCheck)`
  background-color: ${({ theme }) => theme.color.mainStrong};
  /* font-size: 20px;
  width: 1em;
  height: 1em; */
  padding: 0.2em;
  border-radius: 50%;
  color: white;
`;

export const TodoCancelButton = styled.button`
  border: none;
  background-color: transparent;
  margin-left: auto;
  flex-shrink: 0;
  font-size: 24px;
  width: 1em;
  height: 1em;

  &:hover {
    cursor: pointer;
  }
`;

export const TodoCancelIcon = styled(MdCancel)`
  color: ${({ theme }) => theme.color.bgDarkGray};
`;

export const TodoTextInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  ${TodoTextStyle}
  width : 70%;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const TodoForm = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  /* background-color: red; */
`;

export const TextAndErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorText = styled.span`
  ${TodoTextStyle}
  font-size : 12px;
  color: red;
  font-weight: 600;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 2em;
  border: none;
  background-color: white;
  color: ${({ theme }) => theme.color.mainStrong};
  font-size: clamp(20px, 2vh, 30px);
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;

export const PlusSign = styled(FaPlus)`
  display: flex;
`;

export const AddText = styled.span``;
