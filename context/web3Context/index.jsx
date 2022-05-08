import React, { createContext, useReducer } from 'react';
import AppReducer from './reducer';

export const InitialAppContextState = {
  userOnChainId: 0,
  provider: null,
  address: '',
};

export const Web3Context = createContext({});

const Web3ContextProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(
    AppReducer,
    InitialAppContextState
  );

  return (
    <Web3Context.Provider value={{ appState, appDispatch }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
