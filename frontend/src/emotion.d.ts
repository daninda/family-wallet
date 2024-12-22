import '@emotion/react';
import { Theme as CustomTheme } from './themes';

declare module '@emotion/react' {
    export type Theme = CustomTheme;
}
