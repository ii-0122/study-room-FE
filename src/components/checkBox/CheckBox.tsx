import { useState } from 'react';
import { CheckBoxStyle } from './CheckBox.style';

interface CheckBoxProps {
  isVisible?: boolean;
}

export default function CheckBox({ isVisible = true }: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <CheckBoxStyle
      isChecked={isChecked}
      isVisible={isVisible}
      onClick={(e) => {
        e?.stopPropagation();
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
