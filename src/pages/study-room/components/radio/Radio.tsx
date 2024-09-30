import { forwardRef, KeyboardEvent } from 'react';
import * as S from '@/pages/study-room/components/radio/Radio.style';

interface RadioProps {
  id: string;
  name: string;
  options: { value: boolean; label: string }[];
  selectedValue: boolean;
  onChange: (value: boolean) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ id, name, options, selectedValue, onChange, onKeyDown }, ref) => {
    return (
      <S.Radio>
        {options.map((option) => (
          <S.RadioLabel key={option.label}>
            <S.RadioButton
              ref={ref}
              id={id + option.label}
              name={name}
              value={String(option.value)}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              onKeyDown={onKeyDown}
            />
            {option.label}
          </S.RadioLabel>
        ))}
      </S.Radio>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
