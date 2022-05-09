import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import Web3ContextProvider from '../context/web3Context';

// For Web3 Provider
const getLibrary = (provider: any) => {
  return new Web3(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
