import SCreateButton from '@/components/button/SCreateButton';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';

interface LeaveButtonProps {
  onClick: () => void;
}

const LeaveButton: React.FC<LeaveButtonProps> = ({ onClick }) => {
  return (
    <SCreateButton
      label="나가기"
      width="160px"
      height="56px"
      Icon={FiLogOut}
      onClick={onClick}
      borderRadius="10px"
      fontSize="24px"
      iconSize="25px"
    />
  );
};

export default LeaveButton;
