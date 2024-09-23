import { css } from 'styled-components';

export const scrollMixin = {
  customScrollbar: () => css`
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: #ccc;
    }
  `,
};
