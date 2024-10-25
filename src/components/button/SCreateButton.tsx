import React from 'react';
import * as S from './SCreateButton.style';
import { IconType } from 'react-icons/lib';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  Icon?: IconType;
  width?: string;
  height?: string;
  borderRadius?: string;
  fontSize?: string;
  iconSize?: string;
  backgroundColor?: string;
  border?: string;
  borderColor?: string;
  color?: string;
}

function SCreateButton({
  label,
  width,
  height,
  Icon,
  borderRadius,
  fontSize = '24px',
  iconSize = '16',
  backgroundColor = '#599BFC',
  border,
  borderColor = 'transparent',
  color = 'white',
  ...props
}: ButtonProps) {
  return (
    <S.SCreateButtonStyle
      width={width}
      height={height}
      borderRadius={borderRadius}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      border={border}
      borderColor={borderColor}
      color={color}
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
