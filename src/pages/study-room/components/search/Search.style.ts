import styled from 'styled-components';

export const SearchStyle = styled.div`
  //width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  height: 46px;
  border-radius: 7px;
  border: 1.5px solid;
  border-color: ${({ theme }) => theme.color.mainStrong};
  width: 550px;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    height: 42px;
    font-size: 14px;
    padding: 0 10px;
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
`;
