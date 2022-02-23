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
