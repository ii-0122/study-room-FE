import { MainContentArea, StudyRoomsStyle } from "./StudyRooms.style";
import SelectBox from "./components/filter/SelectBox";
import Search from "./components/search/Search";
import CreateButton from "./components/button/CreateButton";
import StudyGrid from "./components/item/StudyGrid";
import CheckBox from "./components/filter/CheckBox";

function StudyRooms() {
  return (
    <StudyRoomsStyle>
      <MainContentArea>
        <div className="wrapper">
          <div className="header">
            <Search/>
            <SelectBox />
            <CheckBox />
            <CreateButton />
          </div>
          <StudyGrid />
        </div>
      </MainContentArea>
    </StudyRoomsStyle>
  );
};

export default StudyRooms;