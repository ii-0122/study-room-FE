import { useState } from 'react';
import { CheckBoxStyle } from './CheckBox.style';

export default function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <CheckBoxStyle
      position="right"
      isChecked={isChecked}
      onClick={(event) => {
        event?.stopPropagation();
      }}
    >
      <label className="custom-checkbox">
        <input
          type="checkbox"
          className="checkBox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="custom-checkbox-content"></span>
      </label>
    </CheckBoxStyle>
  );
}
