import { Contract } from '@ethersproject/contracts';
import { useCallback, useEffect, useState } from 'react';
import { ContractInfo } from 'web3/config';
import { getEthersProvider } from 'web3/providers';

export const useReadContract = (info: ContractInfo): Contract | null => {
  const [contract, setContract] = useState<Contract | null>(null);

  const createContract = useCallback(() => {
    const { chainId, address, abi } = info;
    const provider = getEthersProvider(chainId);
    if (provider) {
      setContract(new Contract(address, abi, provider));
    }
  }, [info]);

  useEffect(() => {
    createContract();
  }, [createContract]);
  return contract;
};
