import SCreateButton from '@/components/button/SCreateButton';
import React from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

interface StartPauseButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const StartPauseButton: React.FC<StartPauseButtonProps> = ({
  isActive,
  onClick,
}) => {
  return (
    <SCreateButton
      label={isActive ? '일시 정지' : '시작'}
      Icon={isActive ? FaPause : FaPlay}
      onClick={onClick}
      size="small"
      borderRadius="15px"
      fontSize="40px"
      iconSize="40px"
    />
  );
};

export default StartPauseButton;
