import { activateInjectedProvider, ProviderType } from '../../utils/injected';
import { useWeb3React } from '@web3-react/core';
import {
  injected as MetaMaskConnector,
  coinbaseWallet as CoinbaseConnector,
} from '../../connectors';
import { getDisplayAddress } from '../../utils';
import useWeb3Hook from '../../hooks/useWeb3Hook';

const ConnectWallet = () => {
  const { account, active, activate, deactivate } = useWeb3React();
  const { onConnect } = useWeb3Hook();

  const handleConnectMetamask = async () => {
    try {
      activateInjectedProvider(ProviderType.METAMASK);
      activate(MetaMaskConnector);
      await onConnect();
    } catch (error) {
      console.log('Error from connecting to Metamask', error);
    }
  };

  const handleConnectCoinbase = async () => {
    try {
      activateInjectedProvider(ProviderType.COINBASE);
      activate(CoinbaseConnector);
      await onConnect();
    } catch (error) {
      console.log('Error from connecting to Coinbase', error);
    }
  };

  return (
    <div>
      {account && active ? (
        <>
          <p>Address: </p>
          {getDisplayAddress(account)}
          <button onClick={deactivate}>Disconnect</button>
        </>
      ) : (
        <>
          <button onClick={handleConnectMetamask}>Metamask</button>
          <button onClick={handleConnectCoinbase}>Coinbase</button>
        </>
      )}
    </div>
  );
};

export default ConnectWallet;