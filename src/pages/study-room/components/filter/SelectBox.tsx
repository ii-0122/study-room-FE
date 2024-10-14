import { useState } from 'react';
import * as S from './SelectBox.style';
import { GoArrowSwitch } from 'react-icons/go';

interface SelectBoxProps {
  onFilterChange: (filter: { isPublic?: boolean }) => void;
}

const options = [
  { value: 'all', label: '전체 스터디룸' },
  { value: 'public', label: '공개 스터디룸' },
  { value: 'secret', label: '비공개 스터디룸' },
];

function SelectBox({ onFilterChange }: SelectBoxProps) {
  const [selectedValue, setSelectedValue] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);

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
      <S.Select onClick={() => setIsOpen(!isOpen)}>
        <S.Arrow>
          <GoArrowSwitch />
        </S.Arrow>
        <S.SelectedLabel>
          {options.find((option) => option.value === selectedValue)?.label}
        </S.SelectedLabel>
      </S.Select>

      {isOpen && (
        <S.Options>
          {options.map((option) => (
            <S.Option
              key={option.value}
              onClick={() => handleSelect(option.value)}
              isSelected={option.value === selectedValue}
            >
              {option.label}
            </S.Option>
          ))}
        </S.Options>
      )}
    </S.SelectBoxStyle>
  );
}

export default SelectBox;
