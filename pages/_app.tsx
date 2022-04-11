import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { Head } from 'components/Head';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { ApplicatonContextProvider } from 'context/ApplicationContext';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { globalStyles, theme } from 'styles/theme';
import { GRAPH_URL } from 'utils/constants';
import { WalletProvider } from 'web3';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { asPath } = useRouter();

  const isAdmin = asPath.startsWith('/admin');
  if (isAdmin) {
    return (
      <>
        <Head title="Trusted Seed CMS" />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Head />
      <Global styles={globalStyles} />
      <WalletProvider>
        <ApplicatonContextProvider>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </ApplicatonContextProvider>
      </WalletProvider>
    </ChakraProvider>
  );
};

export default withUrqlClient(() => ({ url: GRAPH_URL }), {
  ssr: true,
  staleWhileRevalidate: true,
})(App);
