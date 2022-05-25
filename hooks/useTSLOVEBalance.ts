import { useEffect, useState } from 'react';
import { config, useWallet } from 'web3';

import { useReadContract } from './useContract';

export const useTSLOVEBalance = (): {
  fetching: boolean;
  balance: number;
} => {
  const { address } = useWallet();

  const contract = useReadContract(config.TSLOVE);

  const [fetching, setFetching] = useState(false);

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setFetching(true);
        if (address && contract) {
          const b = await contract.balanceOf(address);
          setBalance(Number(b.toString().slice(0, -18)));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching TSLOVE balance', error);
        setBalance(0);
      } finally {
        setFetching(false);
      }
    })();
  }, [address, contract]);

  return { fetching, balance };
};
