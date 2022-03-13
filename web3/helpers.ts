import { utils as ethersUtils } from 'ethers';
import { NETWORK_INFO } from 'web3/networks';

export const formatAddress = (
  address: string | null | undefined,
  ensName?: string | null,
  chars = 5,
): string => {
  if (ensName) return ensName;
  else if (address) {
    address = ethersUtils.getAddress(address); // eslint-disable-line no-param-reassign
    return `${address.substring(0, chars)}...${address.substring(
      address.length - chars,
    )}`;
  } else return '';
};

export const isSupportedNetwork = (chainId: string): boolean =>
  Object.keys(NETWORK_INFO).includes(chainId);
