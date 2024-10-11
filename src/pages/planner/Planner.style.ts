import { scrollMixin } from '@/styles/mixins';
import styled, { keyframes } from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const panelPadding = '3rem 0';

export const PlannerWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: calc(100vh - 80px);
  .label {
    color: ${({ theme }) => theme.color.labelGray};
    font-weight: 600;
    font-size: max(1rem, 1.2vw);
  }
  gap: 2rem;
`;

export const LeftPanel = styled.div`
  padding: ${panelPadding};
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const LeftHeader = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  padding: min(1vh, 10px);

  .date {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: max(1.2rem, 1.5vw);
    font-weight: 600;
  }
`;

export const AddButton = styled(FaPlus)`
  display: flex;
  align-items: center;
  font-size: max(1rem, 1.3vw);
  font-weight: 600;
  margin-left: auto;
  &:hover {
    cursor: pointer;
  }
`;

export const LeftContentWrapper = styled.div`
  display: flex;
  overflow-x: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  padding-right: 5px;
  ${scrollMixin.customScrollbar()}
`;

export const TodosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  gap: 3%;
  padding: 0 1rem;
`;

export const EachContentWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 20%;
  justify-content: center;
`;

export const TimeLineFull = styled.div<{ height: number }>`
  background-color: ${({ theme }) => theme.color.plannerGray};
  width: 3px;
  position: relative;
  height: ${(props) => `${props.height - 5}px`};
  min-height: 100%;

  margin: 0 1rem 0 5rem;

  &::before,
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    position: absolute;
    background-color: ${({ theme }) => theme.color.plannerGray};
    border-radius: 50%;
  }

  &::before {
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
  }

  &::after {
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.color.plannerGray};
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  line-height: 3rem;
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  padding: ${panelPadding};
  padding-left: 3%;
`;

export const StudiedTime = styled.div`
  font-weight: 600;
  font-size: max(1rem, 1.3vw);
  margin: 1.5rem 0px;
  height: 1em;
`;
