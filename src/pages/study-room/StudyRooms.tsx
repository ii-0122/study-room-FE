import { useState } from 'react';
import SelectBox from './components/filter/SelectBox';
import Search from './components/search/Search';
import CreateButton from './components/button/CreateButton';
import StudyGrid from './components/item/StudyGrid';
import CheckBox from './components/filter/CheckBox';
import * as S from './StudyRooms.style';
import Modal from '@/components/modal/Modal';
import CreateStudyRoomForm from '@/pages/study-room/components/form/CreateStudyRoomForm';

interface Filter {
  isPublic?: boolean;
  isPossible?: boolean;
  search?: string;
}

function StudyRooms() {
  const [filter, setFilter] = useState<Filter>({});
  const [showModal, setShowModal] = useState(false);

  const handleFilterChange = (newFilter: Filter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  return (
    <S.StudyRoomsStyle>
      <S.Wrapper>
        <S.Header>
          <Search onSearchChange={(search) => handleFilterChange({ search })} />
          <CreateButton onClick={() => setShowModal(true)} />
        </S.Header>
        <S.Filter>
          <SelectBox onFilterChange={handleFilterChange} />
          <CheckBox onFilterChange={handleFilterChange} />
        </S.Filter>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateStudyRoomForm />
          </Modal>
        )}
        <StudyGrid filter={filter} />
      </S.Wrapper>
    </S.StudyRoomsStyle>
  );
}

export default StudyRooms;
