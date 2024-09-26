import { TbTriangleInvertedFilled } from 'react-icons/tb';
import * as S from './SelectBox.style';
import { useState } from 'react';

interface SelectBoxProps {
  onFilterChange: (filter: { isPublic?: boolean }) => void;
}

function SelectBox({ onFilterChange }: SelectBoxProps) {
  const [selectedValue, setSelectedValue] = useState('all');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);

    if (value === 'public') {
      onFilterChange({ isPublic: true });
    } else if (value === 'secret') {
      onFilterChange({ isPublic: false });
    } else {
      onFilterChange({ isPublic: undefined });
    }
  };

  return (
    <S.SelectBoxStyle>
      <div className="select-wrap">
        <select
          id="study-select"
          name="전체 스터디"
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="all">전체 스터디</option>
          <option value="public">공개 스터디</option>
          <option value="secret">비공개 스터디</option>
        </select>
        <TbTriangleInvertedFilled className="triangle" />
      </div>
    </S.SelectBoxStyle>
  );
}

export default SelectBox;
