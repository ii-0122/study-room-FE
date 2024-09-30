import SCreateButton from '@/components/button/SCreateButton';
import { FaPlus } from 'react-icons/fa';
import * as S from './CreateButton.style';

interface CreateButtonProps {
  marginRight?: string;
}

function CreateButton({ marginRight }: CreateButtonProps) {
  return (
    <S.CreateButtonStyle style={{ marginRight }}>
      <SCreateButton
        label="스터디방 개설"
        width="226px"
        height="46px"
        Icon={FaPlus}
        borderRadius="7px"
        fontSize="16px"
        iconSize="22px"
      />
    </S.CreateButtonStyle>
  );
}

export default CreateButton;
