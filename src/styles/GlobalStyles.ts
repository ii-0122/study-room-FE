import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
  ${reset} 
  *{
      box-sizing: border-box;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

  html, body {
    font-family: 'Pretendard-Regular', sans-serif;
    height: 100%;
    margin: 0;
    padding: 0;
    //overflow: hidden;
  }

  a{
        text-decoration: none;
        color: inherit;
  } 
`;

export default GlobalStyles;
