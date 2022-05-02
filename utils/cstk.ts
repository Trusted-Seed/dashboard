import { ethers } from 'ethers';

export const getCstkBalance: ethers.BigNumber = async (
  address: string,
  provider: ethers.providers.Provider,
) => {
  const abi = [
    // Read-Only Functions
    'function balanceOf(address owner) view returns (uint256)',
  ];
  const erc20 = new ethers.Contract(address, abi, provider);
  return (await erc20.balanceOf(address)) as ethers.BigNumber;
};
