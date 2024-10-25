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
      width="160px"
      height="56px"
      borderRadius="10px"
      fontSize="24px"
      iconSize="25px"
    />
  );
};

export default StartPauseButton;
