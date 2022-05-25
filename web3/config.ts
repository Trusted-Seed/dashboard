import { Interface } from '@ethersproject/abi';
import { ERC20_ABI, REGISTRY_ABI } from 'web3/abi';

export type ContractInfo = {
  chainId: string;
  address: string;
  abi: Interface;
};

export type TrustedSeedConfig = {
  defaultNetwork: string;
  infuraId: string | undefined;
  Registry: ContractInfo;
  TRUST: ContractInfo;
  CSTK: ContractInfo;
  TSLOVE: ContractInfo;
};

export const config: TrustedSeedConfig = {
  defaultNetwork: '0x1',
  infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
  Registry: {
    chainId: '0x64',
    address: '0x28512FB7681c8615aef25a8EF3bcb90aFAC502cB',
    abi: REGISTRY_ABI,
  },
  TRUST: {
    chainId: '0x64',
    address: '0x0f478Fc765Ed7a5C52627B0acDFa351FB94309e4',
    abi: ERC20_ABI,
  },
  CSTK: {
    chainId: '0x64',
    address: '0xc4fbE68522ba81a28879763C3eE33e08b13c499E',
    abi: ERC20_ABI,
  },
  TSLOVE: {
    chainId: '0x64',
    address: '0xd644e622eca66ed531d878cc5a7e2dbf3753975b',
    abi: ERC20_ABI,
  },
};

export default config;
