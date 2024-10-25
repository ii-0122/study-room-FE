import { CheckBoxStyle } from './CheckBox.style';

interface CheckBoxProps {
  isVisible?: boolean;
  defaultChecked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
}

export default function CheckBox({
  isVisible = true,
  defaultChecked,
  onChange,
  disabled = false,
}: CheckBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange();
    }
  };

  return (
    <CheckBoxStyle
      isChecked={defaultChecked}
      isVisible={isVisible}
      onClick={(e) => {
        e?.stopPropagation();
      }}
    >
      <label className="custom-checkbox">
        <input
          type="checkbox"
          className="checkBox"
          checked={defaultChecked}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className="custom-checkbox-content"></span>
      </label>
    </CheckBoxStyle>
  );
}
