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
    width: 24px;
    height: 24px;
  }

  .custom-checkbox-content {
    display: inline-block;
    min-width: 24px;
    min-height: 24px;
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
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  .checkBox:checked + .custom-checkbox-content {
    background-color: #007bff;
  }
`;
