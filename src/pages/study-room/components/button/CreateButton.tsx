import SCreateButton from '@/components/button/SCreateButton';
import { FaPlus } from 'react-icons/fa';

interface CreateButtonProps {
  onClick: () => void;
}

function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <SCreateButton
      label="공부방 개설"
      width="250px"
      height="46px"
      Icon={FaPlus}
      borderRadius="7px"
      fontSize="16px"
      iconSize="22px"
      onClick={onClick}
    />
  );
}

export default CreateButton;
