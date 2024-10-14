import SCreateButton from '@/components/button/SCreateButton';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const ToStudyRooms = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/study-rooms');
  };

  return (
    <SCreateButton
      label="스터디룸 찾기"
      width="100%"
      height="46px"
      Icon={FaArrowRight}
      borderRadius="7px"
      fontSize="16px"
      iconSize="22px"
      color="black"
      backgroundColor="white"
      borderColor="#E4E4E4"
      onClick={handleClick}
    />
  );
};

export default ToStudyRooms;
