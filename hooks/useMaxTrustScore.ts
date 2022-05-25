import { useEffect, useState } from 'react';
import { config, useWallet } from 'web3';

import { useReadContract } from './useContract';

export const useMaxTrustScore = (): {
  fetching: boolean;
  maxTrustScore: number;
} => {
  const { address } = useWallet();

  const contract = useReadContract(config.Registry);

  const [fetching, setFetching] = useState(false);

  const [maxTrustScore, setMaxTrustScore] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setFetching(true);
        if (address && contract) {
          const s = await contract.getMaxTrust(address);
          setMaxTrustScore(s.toNumber());
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching MaxTrustScore', error);
        setMaxTrustScore(0);
      } finally {
        setFetching(false);
      }
    })();
  }, [address, contract]);

  return { fetching, maxTrustScore };
};
