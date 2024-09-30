import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
  ${reset} 
  *{
      box-sizing: border-box;
  }

  html, body {
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
