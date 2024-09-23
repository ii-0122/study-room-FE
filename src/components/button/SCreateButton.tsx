import React from 'react';
import { IconType } from 'react-icons';
import { ButtonSize } from '@/styles/theme';
import * as S from './SCreateButton.style';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  Icon?: IconType;
  size?: ButtonSize;
  borderRadius?: string;
  fontSize?: string;
  iconSize?: string;
}

function SCreateButton({
  label,
  size = 'small',
  Icon,
  borderRadius,
  fontSize = '24px',
  iconSize = '16',
  ...props
}: ButtonProps) {
  return (
    <S.SCreateButtonStyle
      size={size}
      borderRadius={borderRadius}
      fontSize={fontSize}
      {...props}
    >
      {Icon && (
        <div className="icon">
          <Icon size={iconSize} />
        </div>
      )}
      <span className="label">{label}</span>
    </S.SCreateButtonStyle>
  );
}

export default SCreateButton;
