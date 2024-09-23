import { scrollMixin } from '@/styles/mixins';
import styled, { css } from 'styled-components';
import { MdCancel, MdEdit } from 'react-icons/md';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;

export const DateWrapper = styled.div`
  display: flex;
  font-size: 40px;
  justify-content: space-around;
  font-weight: 600;
  width: 100%;
  margin-top: 20px;
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
  height: 70%;
  padding-right: 5px;
  ${scrollMixin.customScrollbar()}
`;

export const TodoBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected'].includes(prop),
})<{ isSelected?: boolean }>`
  display: flex;
  width: 459px;
  height: 65px;
  flex-shrink: 0;
  border-radius: 10px;

  align-items: center;
  padding: 0px 20px;

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
  font-size: 28px;
`;

export const TodoTextArea = styled.div`
  ${TodoTextStyle}
`;

export const TodoEditIcon = styled(MdEdit)`
  display: flex;
  width: 35px;
  height: 35px;
  padding: 3px;
  align-items: center;
  margin-left: auto;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.mainStrong};
  }
`;

export const TodoSaveButton = styled.button`
  border: none;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.mainStrong};
  color: white;
  font-size: 20px;
  padding: 2px 10px;
  margin-left: auto;
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.mainStrongHover};
  }
`;

export const TodoCancelButton = styled(MdCancel)`
  margin-left: 10px;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.color.bgDarkGray};
`;

export const TodoTextInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  ${TodoTextStyle}
  width : 70%;
  border-radius: 8px 8px 0px 0px;

  &:focus {
    outline: none;
  }
`;

export const TodoForm = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const TextAndErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorText = styled.span`
  ${TodoTextStyle}
  font-size : 16px;
  color: red;
  font-weight: 600;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  width: 439px;
  height: 77px;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.mainStrong};
  color: white;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
  padding: 0px 20px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.mainStrongHover};
    border: 1px solid ${({ theme }) => theme.color.mainStrong};
  }
`;

export const PlusSign = styled.div`
  display: flex;
`;

export const AddText = styled.span`
  margin: auto;
`;
