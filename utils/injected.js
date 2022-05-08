export const ProviderType = {
  COINBASE: 'COINBASE',
  METAMASK: 'METAMASK',
};

export const activateInjectedProvider = (providerName) => {
  const { ethereum } = window;

  if (!ethereum?.providers) {
    return undefined;
  }

  let provider;
  switch (providerName) {
    case ProviderType.COINBASE:
      provider = ethereum.providers.find(
        ({ isCoinbaseWallet }) => isCoinbaseWallet
      );
      break;
    case ProviderType.METAMASK:
      provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
      break;
  }

  if (provider) {
    ethereum.setSelectedProvider(provider);
  }
};
