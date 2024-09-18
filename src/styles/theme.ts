import { DefaultTheme } from 'styled-components';

export interface Colors {
  main: string;
  mainStrong: string;
  lineGray: string;
  btnOk: string;
  btnWarn: string;
  bgDarkGray: string;
  bgGray: string;
  bgLightGray: string;
  bgYellowNote: string;
  labelGray: string;
  plannerTimeGray: string;
  plannerGray: string;
}

export interface Shadows {
  boxShadow: string;
}

export const theme: DefaultTheme = {
  color: {
    main: '#DDEBFD',
    mainStrong: '#599BFC',
    lineGray: '#A1A1A1',
    btnOk: '#6FA9FF',
    btnWarn: '#FF7777',
    bgDarkGray: '#616161',
    bgGray: '#E5E5E5',
    bgLightGray: '#F9F9F9',
    bgYellowNote: '#FFF9EE',
    labelGray: `#9A9A9A`,
    plannerTimeGray: `#7C7C7C`,
    plannerGray: `#C7C7C7`,
  },

  shadow: {
    boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 12%)',
  },
};
