import SCreateButton from '@/components/button/SCreateButton';
import { FaPlus } from 'react-icons/fa';

interface CreateButtonProps {
  onClick: () => void;
}

function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <SCreateButton
      label="스터디방 개설"
      width="226px"
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
