import { extendTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';

export const theme = extendTheme({
  fonts: {
    body: `'Urbanist', sans-serif`,
    heading: `'Urbanist', sans-serif`,
  },
  colors: {
    darkBG: '#09090A',
    greyBG: '#171616',
    cardBG: 'rgba(22, 22, 22, 0.72)',
    red: {
      50: '#ffffff',
      100: '#ffffff',
      200: '#ffe5e5',
      300: '#fcb7b8',
      400: '#f5898a',
      500: '#f05c5c',
      600: '#ea2f2e',
      700: '#d11715',
      800: '#a30f0f',
      900: '#76090a',
    },
    ceruleanBlue: '#12BAD6',
    darkCeruleanBlue: '#0b7385',
  },
});

export const globalStyles = css`
  html,
  body {
    background: #09090a;
    overflow-x: hidden;
  }
`;
