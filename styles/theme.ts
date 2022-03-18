import { extendTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';

export const theme = extendTheme({
  breakpoints: {
    base: '0em',
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
    '3xl': '120em',
  },
  fonts: {
    body: `'Urbanist', sans-serif`,
    heading: `'Urbanist', sans-serif`,
  },
  colors: {
    darkBG: '#09090A',
    greyBG: '#171616',
    greyText: '#A1A1A1',
    membersCardBG: 'rgba(22, 22, 22, 0.72)',
    cardBG: '#202123',
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
    yellow: {
      50: '#ffffff',
      100: '#fff5dd',
      200: '#fce0b3',
      300: '#f7cc87',
      400: '#f4b758',
      500: '#f0a32a',
      600: '#d78912',
      700: '#a76b0b',
      800: '#774c06',
      900: '#492e00',
    },
    blue: {
      50: '#d9fdff',
      100: '#b0f1fc',
      200: '#83e7f6',
      300: '#56dcf2',
      400: '#2bd1ed',
      500: '#12b8d4',
      600: '#008fa6',
      700: '#006678',
      800: '#003e4a',
      900: '#00161d',
    },
    ceruleanBlue: '#12BAD6',
    darkCeruleanBlue: '#0b7385',
  },
});

export const globalStyles = css`
  /* width */
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #2b2d31;
    border-radius: 2.5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #12bad6;
    border-radius: 2.5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #0b7385;
  }

  html,
  body {
    background: #09090a;
    overflow-x: hidden;
    scrollbar-color: #12bad6 #2b2d31;
    ::-webkit-scrollbar-track {
      background: #2b2d31;
      border-radius: 0px;
    }
    ::-webkit-scrollbar {
      width: 10px;
    }
  }
`;
