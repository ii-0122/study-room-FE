import React from 'react';
import { IconType } from 'react-icons';
import * as S from './SCreateButton.style';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  Icon?: IconType;
  width?: string;
  height?: string;
  borderRadius?: string;
  fontSize?: string;
  iconSize?: string;
}

function SCreateButton({
  label,
  width,
  height,
  Icon,
  borderRadius,
  fontSize = '24px',
  iconSize = '16',
  ...props
}: ButtonProps) {
  return (
    <S.SCreateButtonStyle
      width={width}
      height={height}
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
