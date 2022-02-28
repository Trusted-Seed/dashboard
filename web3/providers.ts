import { StaticJsonRpcProvider } from '@ethersproject/providers';
import memoize from 'fast-memoize';
import { NETWORK_INFO } from 'web3/networks';

const NETWORK_TIMEOUT = 1000;

const memoized = memoize((url: string) => new StaticJsonRpcProvider(url));

const providerWithHealth = async (
  url: string,
): Promise<StaticJsonRpcProvider | null> => {
  if (!url) return null;
  const provider = memoized(url);
  try {
    await Promise.race([
      // eslint-disable-next-line no-underscore-dangle
      provider._networkPromise,
      setTimeout(
        () => Promise.reject(new Error('Network timeout')).catch(() => null),
        NETWORK_TIMEOUT,
      ),
    ]);
    return provider;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in checking RPC health', error);
    return null;
  }
};

export const getEthersProvider = async (
  chainId: string,
): Promise<StaticJsonRpcProvider | null> => {
  const networkConfig = NETWORK_INFO[chainId];
  if (!networkConfig) return null;
  const { rpc } = networkConfig;

  return providerWithHealth(rpc);
};
