import styled from 'styled-components';

export const TagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  color: #30363d;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 5px 10px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const RemoveButton = styled.span`
  margin-left: 8px;
  cursor: pointer;
  color: #ccc;

  &:hover {
    color: black;
  }
`;
