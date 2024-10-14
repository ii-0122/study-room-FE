import styled from 'styled-components';

export const HomeTodoStyle = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const TodoWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  background-color: white;
  padding: 20px;
  overflow-y: auto;
`;

export const TodoItem = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 20px;
`;

export const Todo = styled.div`
  display: flex;
  font-size: 1.1rem;
  align-items: center;
`;

export const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 10px;
  align-items: center;
  cursor: pointer;
`;

export const NoData = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.plannerGray};
  font-size: 1.7rem;
  font-weight: 600;
`;
