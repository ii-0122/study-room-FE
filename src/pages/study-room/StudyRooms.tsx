import { useState } from 'react';
import SelectBox from './components/filter/SelectBox';
import Search from './components/search/Search';
import CreateButton from './components/button/CreateButton';
import StudyGrid from './components/item/StudyGrid';
import CheckBox from './components/filter/CheckBox';
import * as S from './StudyRooms.style';

interface Filter {
  isPublic?: boolean;
  isPossible?: boolean;
  search?: string;
}

function StudyRooms() {
  const [filter, setFilter] = useState<Filter>({});

  const handleFilterChange = (newFilter: Filter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  const handleSearchChange = (search: string) => {
    handleFilterChange({ search });
  };

  return (
    <S.StudyRoomsStyle>
      <S.MainContentArea>
        <div className="wrapper">
          <div className="header">
            <Search onSearchChange={handleSearchChange} />
            <SelectBox onFilterChange={handleFilterChange} />
            <CheckBox onFilterChange={handleFilterChange} />
            <CreateButton />
          </div>
          <StudyGrid filter={filter} />
        </div>
      </S.MainContentArea>
    </S.StudyRoomsStyle>
  );
}

export default StudyRooms;
