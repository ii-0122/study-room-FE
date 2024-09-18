import { CreateButtonStyle } from "./CreateButton.style";
import SCreateButton from "@/components/button/SCreateButton";
import { FaPlus } from "react-icons/fa";

function CreateButton() {
  // 모달 오픈

  return (
    <CreateButtonStyle>
      <SCreateButton
        label="스터디방 개설" 
        size="medium" 
        Icon={FaPlus}
        borderRadius="10px"
        fontSize="24px"
        iconSize="32px"
      />

    </CreateButtonStyle>
  );
};

export default CreateButton;