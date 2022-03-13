import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { Head } from 'components/Head';
import { LayoutWrapper } from 'components/LayoutWrapper';
import type { AppProps } from 'next/app';
import { withUrqlClient } from 'next-urql';
import { globalStyles, theme } from 'styles/theme';
import { GRAPH_URL } from 'utils/constants';
import { WalletProvider } from 'web3';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider resetCSS theme={theme}>
    <Head />
    <Global styles={globalStyles} />
    <WalletProvider>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </WalletProvider>
  </ChakraProvider>
);

export default withUrqlClient(() => ({ url: GRAPH_URL }))(App);
