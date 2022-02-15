import { extendTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';

export const theme = extendTheme({
  // customize default chakra theme here
});

export const globalStyles = css`
  html,
  body {
    scroll-behaviour: smooth;
  }
`;
