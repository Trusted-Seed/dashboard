import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { Head } from 'components/Head';
import type { AppProps } from 'next/app';
import React from 'react';
import { globalStyles, theme } from 'styles/theme';
import { WalletProvider } from 'web3';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider resetCSS theme={theme}>
    <Head />
    <Global styles={globalStyles} />
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  </ChakraProvider>
);

export default App;
