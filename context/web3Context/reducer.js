/* eslint-disable no-case-declarations */
import {
  SET_WEB3_PROVIDER,
  SET_ADDRESS,
  RESET_WEB3_PROVIDER,
} from '../actionType';
import { InitialAppContextState } from './index.jsx';

const Web3Reducer = (state, action) => {
  switch (action.type) {
    case SET_WEB3_PROVIDER:
      return {
        ...state,
        userOnChainId: action.value.userOnChainId,
        provider: action.value.provider,
        address: action.value.address,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.value.address,
      };
    case RESET_WEB3_PROVIDER:
      return InitialAppContextState;
    default:
      return state;
  }
};

export default Web3Reducer;
