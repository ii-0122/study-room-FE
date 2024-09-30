import { forwardRef } from 'react';
import * as S from '@/pages/study-room/components/toggleButton/ToggleButton.style';

interface ToggleButtonProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ToggleButton = forwardRef<HTMLInputElement, ToggleButtonProps>(
  ({ id, checked, onChange, onKeyDown }, ref) => {
    return (
      <S.ToggleSwitch>
        <S.ToggleSwitchLabel>
          <S.Checkbox
            ref={ref}
            id={id}
            checked={checked}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <S.Slider />
        </S.ToggleSwitchLabel>
      </S.ToggleSwitch>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
