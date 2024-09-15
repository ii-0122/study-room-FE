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
  },
};
