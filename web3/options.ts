import { IProviderOptions } from 'web3modal';

const providerOptions: IProviderOptions = {
  // authereum: {
  //   package: Authereum,
  // },
  // frame: {
  //   package: ethProvider,
  // },
  // portis: {
  //   package: Portis,
  //   options: {
  //     // Get the DAPP ID at https://dashboard.portis.io/
  //     id: "YOUR-PORTIS-DAPP-ID",
  //   },
  // },
  // walletconnect: {
  //   package: WalletConnectProvider,
  //   options: {
  //     rpc: {
  //       1: networks["0x1"].rpc,
  //       4: networks["0x4"].rpc,
  //       1337: networks["0x539"].rpc,
  //     },
  //   },
  // },
  // .. Other providers
};

export const WEB3_MODAL_OPTIONS = {
  cacheProvider: true,
  providerOptions,
  theme: 'dark',
};
