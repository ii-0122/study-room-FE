import { SelectBoxStyle } from "./SelectBox.style";
import { TbTriangleInvertedFilled } from "react-icons/tb";

function SelectBox() {

  return (
    <SelectBoxStyle>
      <div className="select-wrap">
        <select id="study-select" name="전체 스터디">
          <option value="all">전체 스터디</option>
          <option value="public">공개 스터디</option>
          <option value="secret">비공개 스터디</option>
        </select>
        <TbTriangleInvertedFilled className="triangle" />
      </div>
    </SelectBoxStyle>
  );
};

export default SelectBox;