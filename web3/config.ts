import { Interface } from '@ethersproject/abi';
import { ERC20_ABI } from 'web3/abi';

export type ContractInfo = {
  chainId: string;
  address: string;
  abi: Interface;
};

export type TrustedSeedConfig = {
  defaultNetwork: string;
  infuraId: string | undefined;
  CSTK: ContractInfo;
  CSLOVE: ContractInfo;
};

export const config: TrustedSeedConfig = {
  defaultNetwork: '0x1',
  infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
  CSTK: {
    chainId: '0x64',
    address: '0xc4fbE68522ba81a28879763C3eE33e08b13c499E',
    abi: ERC20_ABI,
  },
  CSLOVE: {
    chainId: '0x4',
    address: '0x4d64a862e0efb94b1d2a84a67f7a2d669afa8edf',
    abi: ERC20_ABI,
  },
};

export default config;
