import styled from 'styled-components';

export const SearchStyle = styled.div`
  .search {
    display: flex;
    position: relative;
    align-items: center;
    width: 472px;
    height: 46px;
    border-radius: 7px;
    border: 1.5px solid;
    border-color: ${({ theme }) => theme.color.mainStrong};

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      height: 42px;
      width: 100%;
      font-size: 14px;
    }

    .search-icon {
      font-size: 30px;
      margin: 0 10px;
      color: ${({ theme }) => theme.color.mainStrong};
    }

    .close-icon {
      font-size: 30px;
      margin: 0 10px;
      color: ${({ theme }) => theme.color.mainStrong};
      cursor: pointer;
    }
  }
`;
