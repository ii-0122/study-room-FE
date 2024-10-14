import { createStudyRoom } from '@/apis/studyRooms.api';
import SCreateButton from '@/components/button/SCreateButton';
import { CreateStudyRoomFormData } from '@/types/createStudyRoom';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const ToPrivateButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const bodyData: CreateStudyRoomFormData = {
      title: '개인 스터디룸',
      tagList: [],
      maxNum: 1,
      notice: '',
      isPublic: true,
      password: '',
      isChat: true,
      imageUrl: '',
    };

    console.log('전송할 데이터:', JSON.stringify(bodyData, null, 2)); // JSON 형식으로 출력

    try {
      const result = await createStudyRoom(bodyData);
      console.log('방 생성 성공:', result);

      // 방 생성 후 해당 방으로 이동
      navigate(`/study-room/${result._id}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error('오류 발생:', err.message);
      } else {
        console.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <SCreateButton
      label="1인 스터디룸 입장"
      width="100%"
      height="46px"
      Icon={FaPlus}
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

export default ToPrivateButton;
