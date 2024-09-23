import SelectBox from './components/filter/SelectBox';
import Search from './components/search/Search';
import CreateButton from './components/button/CreateButton';
import StudyGrid from './components/item/StudyGrid';
import CheckBox from './components/filter/CheckBox';
import * as S from './StudyRooms.style';

function StudyRooms() {
  return (
    <S.StudyRoomsStyle>
      <S.MainContentArea>
        <div className="wrapper">
          <div className="header">
            <Search />
            <SelectBox />
            <CheckBox />
            <CreateButton />
          </div>
          <StudyGrid />
        </div>
      </S.MainContentArea>
    </S.StudyRoomsStyle>
  );
}

export default StudyRooms;
