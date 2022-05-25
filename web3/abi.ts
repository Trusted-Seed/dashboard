import { Interface } from '@ethersproject/abi';

export const ERC20_ABI = new Interface([
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
]);

export const REGISTRY_ABI = new Interface([
  'function getMaxTrust(address account) view returns (uint256)',
  'function getPendingBalance(address account) view returns (uint256)',
]);
