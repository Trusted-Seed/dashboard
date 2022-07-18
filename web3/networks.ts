import EthereumImage from 'assets/ethereum.svg';
import GnosisImage from 'assets/gnosis.svg';
import PolygonImage from 'assets/polygon.svg';
import config from 'web3/config';

export type NetworkInfo = {
  [chainId: string]: {
    chainId: string;
    name: string;
    label: string;
    symbol: string;
    explorer: string;
    explorerLabel: string;
    rpc: string;
    image: string;
  };
};

export const NETWORK_INFO: NetworkInfo = {
  '0x1': {
    chainId: '0x1',
    name: 'Ethereum Mainnet',
    label: 'Ethereum',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
    explorerLabel: 'Etherscan',
    rpc: `https://mainnet.infura.io/v3/${config.infuraId}`,
    image: EthereumImage,
  },
  '0x89': {
    chainId: '0x89',
    name: 'Polygon Mainnet',
    label: 'Polygon',
    symbol: 'MATIC',
    explorer: 'https://polygonscan.com',
    explorerLabel: 'PolygonScan',
    rpc: `https://polygon-rpc.com`,
    image: PolygonImage,
  },
  '0x64': {
    chainId: '0x64',
    name: 'Gnosis Chain',
    label: 'Gnosis',
    symbol: 'xDAI',
    explorer: 'https://blockscout.com/xdai/mainnet',
    explorerLabel: 'Blockscout',
    rpc: 'https://rpc.ankr.com/gnosis',
    image: GnosisImage,
  },
};
