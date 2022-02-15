import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { WalletContext, WalletContextType } from 'web3/WalletContext';

import { DEFAULT_NETWORK, NETWORK_CONFIG } from './constants';

export const useWallet: () => WalletContextType = () =>
  useContext(WalletContext);

export const useENS = (
  address: string | null | undefined,
): {
  ens: string | null | undefined;
  fetching: boolean;
} => {
  const [localENS, setLocalENS] = useState<string | null | undefined>();
  const [fetching, setFetching] = useState(false);

  const { isConnected } = useWallet();
  const localProvider = useMemo(
    () => new StaticJsonRpcProvider(NETWORK_CONFIG[DEFAULT_NETWORK].rpc),
    [],
  );

  const populateENS = useCallback(async () => {
    if (!localProvider) return;

    try {
      setFetching(true);
      if (address) {
        const ens = await localProvider.lookupAddress(address);
        setLocalENS(ens);
        return;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error populating ENS', error);
    } finally {
      setFetching(false);
    }
  }, [address, localProvider]);

  useEffect(() => {
    populateENS();
  }, [isConnected, populateENS]);

  return {
    ens: localENS,
    fetching,
  };
};
