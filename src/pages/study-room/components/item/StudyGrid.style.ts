import styled, { keyframes } from 'styled-components';

export const StudyGridItem = styled.div`
  display: grid;
  gap: 30px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 20px;
  box-sizing: border-box;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: ${({ theme }) => theme.borderRadius.large};
  }

  &:has(::-webkit-scrollbar) {
    padding-right: 25px;
  }
`;

export const NoData = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.plannerGray};
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  overflow: hidden;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;

export const ErrorMessage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.btnWarn};
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  overflow: hidden;
`;
