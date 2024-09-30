import { useState } from 'react';
import { CheckBoxStyle } from './CheckBox.style';

interface CheckBoxProps {
  isVisible?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function CheckBox({
  isVisible = true,
  defaultChecked,
  onChange,
}: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);

    if (onChange) {
      onChange(e.target.checked);
    }
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
