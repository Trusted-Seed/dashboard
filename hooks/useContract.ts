import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { ContractInfo } from 'web3/config';
import { getEthersProvider } from 'web3/providers';

export const useReadContract = (info: ContractInfo): Contract | null => {
  return useMemo(() => {
    const { chainId, address, abi } = info;
    const provider = getEthersProvider(chainId);
    if (provider) {
      return new Contract(address, abi, provider);
    }
    return null;
  }, [info]);
};
