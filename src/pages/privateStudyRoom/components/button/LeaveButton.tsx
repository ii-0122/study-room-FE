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
      size="small"
      Icon={FiLogOut}
      onClick={onClick}
      borderRadius="15px"
      fontSize="40px"
      iconSize="40px"
    />
  );
};

export default LeaveButton;
