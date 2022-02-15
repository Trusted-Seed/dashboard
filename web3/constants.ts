export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;

export const DEFAULT_NETWORK = '0x1'; // Used to switch to if the user is on an unsupported network

export type NetworkConfig = {
  [chainId: string]: {
    chainId: string;
    name: string;
    symbol: string;
    explorer: string;
    rpc: string;
  };
};

export const NETWORK_CONFIG: NetworkConfig = {
  '0x1': {
    chainId: '0x1',
    name: 'Mainnet',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
    rpc: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  },
  '0x4': {
    chainId: '0x4',
    name: 'Rinkeby',
    symbol: 'ETH',
    explorer: 'https://rinkeby.etherscan.io',
    rpc: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
  },
};
