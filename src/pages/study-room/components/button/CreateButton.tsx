import SCreateButton from '@/components/button/SCreateButton';
import { FaPlus } from 'react-icons/fa';
import * as S from './CreateButton.style';

function CreateButton() {
  return (
    <S.CreateButtonStyle>
      <SCreateButton
        label="스터디방 개설"
        size="medium"
        Icon={FaPlus}
        borderRadius="10px"
        fontSize="24px"
        iconSize="32px"
      />
    </S.CreateButtonStyle>
  );
}

export default CreateButton;
