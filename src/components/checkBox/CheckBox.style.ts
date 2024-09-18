import styled from 'styled-components';

type CheckBoxPosition = 'left' | 'right';

// CheckBox 사용시, 체크모양의 position이 안맞을 수 있음. 추후 props로 추가해서 수정
export const CheckBoxStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isChecked' && prop !== 'position',
})<{
  isChecked?: boolean;
  position?: CheckBoxPosition;
}>`
  display: flex;

  .checkBox {
    display: none;
  }

  ${(props) => {
    if (props.position === 'right') {
      return 'margin-left : auto;';
    }
    if (props.position === 'left') {
      return 'margin-right : auto;';
    }
    return '';
  }}

  .custom-checkbox {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .custom-checkbox-content {
    display: inline-block;
    width: 30px;
    height: 30px;
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
