import 'styled-components';
import { Colors } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Colors;
  }
}
