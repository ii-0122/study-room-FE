import CheckBox from "@/components/checkBox/CheckBox";
import SelectBox from "./components/filter/SelectBox";
import Search from "./components/search/Search";
import { MainContentArea, StudyRoomsStyle } from "./StudyRooms.style";
import CreateButton from "./components/button/CreateButton";
import StudyGrid from "./components/item/StudyGrid";

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