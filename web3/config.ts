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
};

export const config: TrustedSeedConfig = {
  defaultNetwork: '0x1', // Used to switch to if the user is on an unsupported network. Corresponding network info must be provided in ./networks.ts
  infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
  CSTK: {
    chainId: '0x64',
    address: '0xc4fbE68522ba81a28879763C3eE33e08b13c499E',
    abi: ERC20_ABI,
  },
};

export default config;
