import { extendTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';

export const theme = extendTheme({
  fonts: {
    body: `'Urbanist', sans-serif`,
  },
  colors: {
    darkBG: '#09090A',
    ceruleanBlue: '#12BAD6',
  },
});

export const globalStyles = css`
  html,
  body {
    scroll-behaviour: smooth;
  }
`;
