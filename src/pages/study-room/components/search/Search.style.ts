import styled from 'styled-components';

export const SearchStyle = styled.div`
  .search {
    position: relative;
    width: 703px;
    height: 64px;
    border-radius: 10px;
    border: 2px solid;
    border-color: ${({ theme }) => theme.color.mainStrong};

    input {
      position: absolute;
      border: none;
      outline: none;
      background: transparent;
      width: 562px;
      height: 62px;
      left: 70px;

      font-size: 16px;
    }

    .search-icon {
      position: absolute;
      padding: 15px 15px;
      font-size: 64px;
      left: 10px;
      color: ${({ theme }) => theme.color.mainStrong};
    }

    .close-icon {
      position: absolute;
      padding: 15px 15px;
      font-size: 64px;
      right: 10px;
      color: ${({ theme }) => theme.color.mainStrong};
    }
  }
`;
