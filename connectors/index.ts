import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import envConfig from '../utils/envConfig';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 31337, 137],
});

export const coinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${envConfig.INFURA_ID}`,
  appName: 'SafeZen',
  supportedChainIds: [1, 4, 31337, 137],
});
