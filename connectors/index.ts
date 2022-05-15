import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import envConfig from '../utils/envConfig';

const checkNetworkName = () => {
  if (
    typeof window !== 'undefined' &&
    window.location.hostname &&
    window.location.hostname === 'localhost'
  ) {
    return 31337;
  } else if (envConfig.MAINNET) {
    return 137;
  } else {
    return 80001;
  }
};

const generateRPCUrl = (chainId: number) => {
  switch (chainId) {
    case 137:
      return `https://polygon-mainnet.infura.io/v3/${envConfig.INFURA_ID}`;
    case 80001:
      return `https://polygon-mumbai.infura.io/v3/${envConfig.INFURA_ID}`;
    case 31337:
      return `https://polygon-mumbai.infura.io/v3/${envConfig.INFURA_ID}`;
    default:
      return `https://polygon-mumbai.infura.io/v3/${envConfig.INFURA_ID}`;
  }
};

export const injected = new InjectedConnector({
  supportedChainIds: [31337, 137, 80001],
});

export const coinbaseWallet = new WalletLinkConnector({
  url: generateRPCUrl(checkNetworkName()),
  appName: 'SafeZen',
  supportedChainIds: [31337, 137, 80001],
});

export const walletlink = new WalletLinkConnector({
  url: generateRPCUrl(checkNetworkName()),
  appName: 'SafeZen',
  supportedChainIds: [31337, 137, 80001],
});
