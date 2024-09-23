import { TbTriangleInvertedFilled } from 'react-icons/tb';
import * as S from './SelectBox.style';

function SelectBox() {
  return (
    <S.SelectBoxStyle>
      <div className="select-wrap">
        <select id="study-select" name="전체 스터디">
          <option value="all">전체 스터디</option>
          <option value="public">공개 스터디</option>
          <option value="secret">비공개 스터디</option>
        </select>
        <TbTriangleInvertedFilled className="triangle" />
      </div>
    </S.SelectBoxStyle>
  );
}

export default SelectBox;
