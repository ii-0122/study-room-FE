import { useState } from 'react';
import * as S from './CheckBox.style';

interface CheckBoxProps {
  onFilterChange: (filter: { isPossible?: boolean }) => void;
}

function CheckBox({ onFilterChange }: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onFilterChange({ isPossible: newCheckedState ? true : undefined });
  };

  return (
    <S.CheckBoxStyle>
      <div className="checkbox-wrap">
        <input
          type="checkbox"
          id="checkboxInput"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkboxInput">바로 참여 가능한 방</label>
      </div>
    </S.CheckBoxStyle>
  );
}

export default CheckBox;
