import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { config, useWallet } from 'web3';

import { useReadContract } from './useContract';

export const useCSLOVEBalance = (): {
  fetching: boolean;
  balance: BigNumber;
} => {
  const { address } = useWallet();

  const contract = useReadContract(config.CSLOVE);

  const [fetching, setFetching] = useState(false);

  const [balance, setBalance] = useState(BigNumber.from(0));

  useEffect(() => {
    (async () => {
      try {
        setFetching(true);
        if (address && contract) {
          const b = await contract.balanceOf(address);
          setBalance(b);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching CSLOVE balance', error);
        setBalance(BigNumber.from(0));
      } finally {
        setFetching(false);
      }
    })();
  }, [address, contract]);

  return { fetching, balance };
};
