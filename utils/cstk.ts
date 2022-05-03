import { ethers } from 'ethers';

export const getCstkBalance = async (
  address: string,
  provider: ethers.providers.Provider,
): Promise<ethers.BigNumber> => {
  const abi = [
    // Read-Only Functions
    'function balanceOf(address owner) view returns (uint256)',
  ];
  const erc20 = new ethers.Contract(address, abi, provider);
  return (await erc20.balanceOf(address)) as ethers.BigNumber;
};
