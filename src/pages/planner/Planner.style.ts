import { scrollMixin } from '@/styles/mixins';
import styled from 'styled-components';

const panelPadding = '50px 30px';

export const PlannerWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: calc(100vh - 100px);

  .label {
    color: ${({ theme }) => theme.color.labelGray};
    font-weight: 600;
    font-size: 20px;
  }
`;

export const LeftPanel = styled.div`
  padding: ${panelPadding};
  display: flex;
  flex-direction: column;
`;

export const LeftHeader = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;

  .date {
    margin: auto;
    font-size: 32px;
    font-weight: 600;
  }

  .addButton {
    font-size: 44px;
    font-weight: 600;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const LeftContentWrapper = styled.div`
  display: flex;
  overflow-x: hidden;
  position: relative;
  height: 100%;
  width: 800px;

  ${scrollMixin.customScrollbar()}
`;

export const TodosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const EachContentWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const TimeLineFull = styled.div<{ height: number }>`
  background-color: ${({ theme }) => theme.color.plannerGray};
  width: 3px;
  position: relative;
  height: ${(props) => `${props.height - 5}px`};
  min-height: 100%;

  margin: 0 15px 0 100px;

  &::before,
  &::after {
    content: '';
    width: 10px;
    height: 10px;
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
  font-size: 48px;
  text-align: center;
  font-weight: 600;
  line-height: 70px;
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100%;
  padding: ${panelPadding};
`;

export const StudiedTime = styled.div`
  font-weight: 600;
  font-size: 24px;
  margin: 24px 0px;
`;
