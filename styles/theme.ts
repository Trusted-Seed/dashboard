import { extendTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';

export const theme = extendTheme({
  fonts: {
    body: `'Urbanist', sans-serif`,
    heading: `'Urbanist', sans-serif`,
  },
  colors: {
    darkBG: '#09090A',
    ceruleanBlue: '#12BAD6',
  },
});

export const globalStyles = css`
  html,
  body {
    background: #09090a;
    overflow-x: hidden;
  }
`;
