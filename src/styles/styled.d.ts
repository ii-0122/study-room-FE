import 'styled-components';
import { Colors, Shadows } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Colors;
    shadow: Shadows;
  }
}
