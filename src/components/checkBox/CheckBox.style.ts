import styled from 'styled-components';

export const CheckBoxStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isChecked', 'isVisible'].includes(prop),
})<{
  isChecked?: boolean;
  isVisible: boolean;
}>`
  display: flex;
  ${(props) => !props.isVisible && 'visibility: hidden;'}

  .checkBox {
    display: none;
  }

  .custom-checkbox {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    width: 30px;
    height: 30px;
  }

  .custom-checkbox-content {
    display: inline-block;
    min-width: 30px;
    min-height: 30px;
    background-color: transparent;
    border: 2px solid #a7a7a7;
    border-radius: 8px;
    margin-right: 18px;
    position: relative;
    transition: background-color 0.2s;
  }

  .custom-checkbox-content::after {
    display: ${(props) => (props.isChecked ? 'block' : 'none')};
    content: '';
    position: absolute;
    left: 8px;
    top: 1px;
    width: 8px;
    height: 16px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  .checkBox:checked + .custom-checkbox-content {
    background-color: #007bff;
  }
`;
