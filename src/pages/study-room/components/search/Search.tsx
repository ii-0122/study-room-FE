import React, { useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import * as S from './Search.style';

interface SearchProps {
  onSearchChange: (search: string) => void;
}

function Search({ onSearchChange }: SearchProps) {
  const [searchText, setSearchText] = useState('');

  // X 아이콘 클릭 시 검색글씨 초기화
  const handleClear = () => {
    setSearchText('');
    onSearchChange('');
  };

  // 엔터 키 입력 시 검색어 전달
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchChange(searchText);
    }
  };

  return (
    <S.SearchStyle>
      <IoIosSearch className="search-icon" />
      <input
        type="text"
        id="searchInput"
        placeholder="공부방 이름을 검색해보세요."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {searchText && (
        <IoIosClose className="close-icon" onClick={handleClear} />
      )}
    </S.SearchStyle>
  );
}

export default Search;
