import { useState } from 'react';
import * as S from './CheckBox.style';

function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
