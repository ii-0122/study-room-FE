import { useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import * as S from './Search.style';

function Search() {
  const [searchText, setSearchText] = useState('');

  // X 아이콘 클릭 시 검색글씨 초기화
  const handleClear = () => {
    setSearchText('');
  };

  return (
    <S.SearchStyle>
      <div className="search">
        <IoIosSearch className="search-icon" />
        <input
          type="text"
          id="searchInput"
          placeholder="스터디 이름을 검색해보세요."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <IoIosClose className="close-icon" onClick={handleClear} />
        )}
      </div>
    </S.SearchStyle>
  );
}

export default Search;
