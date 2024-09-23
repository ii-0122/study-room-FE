export type ColorKey =
  | 'main'
  | 'mainStrong'
  | 'mainStrongHover'
  | 'lineGray'
  | 'btnOk'
  | 'btnWarn'
  | 'bgDarkGray'
  | 'bgGray'
  | 'bgLightGray'
  | 'bgYellowNote'
  | 'labelGray'
  | 'plannerTimeGray'
  | 'plannerGray';
export type ButtonSize = 'large' | 'medium' | 'small';
export type BorderRadius = 'large' | 'medium' | 'small';
export type Shadows = string;

interface DefaultTheme {
  color: Record<ColorKey, string>;
  studyRoomButton: {
    [key in ButtonSize]: {
      width: string;
      height: string;
    };
  };
  borderRadius: {
    [key in BorderRadius]: string;
  };
  shadow: {
    boxShadow: string;
  };
}

export const theme: DefaultTheme = {
  color: {
    main: '#DDEBFD',
    mainStrong: '#599BFC',
    mainStrongHover: '#9cc2fc',
    lineGray: '#A1A1A1',
    btnOk: '#6FA9FF',
    btnWarn: '#FF7777',
    bgDarkGray: '#616161',
    bgGray: '#E5E5E5',
    bgLightGray: '#F9F9F9',
    bgYellowNote: '#FFF9EE',
    labelGray: '#9A9A9A',
    plannerTimeGray: '#7C7C7C',
    plannerGray: '#C7C7C7',
  },

  studyRoomButton: {
    large: {
      width: '439px',
      height: '77px',
    },
    medium: {
      width: '328px',
      height: '68px',
    },
    small: {
      width: '262px',
      height: '92px',
    },
  },

  borderRadius: {
    large: '20px',
    medium: '10px',
    small: '5px',
  },

  shadow: {
    boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 12%)',
  },
};
