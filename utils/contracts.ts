import chainMap from './constants/chains';
import { ethers } from 'ethers';
import envConfig from './envConfig';

/**
 * Gets Deployed Contract from contracts folder
 * @param {*} contractName - string
 * @param {*} chainId - number
 * @returns Contract
 */
export const getMainContract = (chainId: number) => {
  let chain = chainMap[chainId];

  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

  try {
    /* eslint-disable global-require */
    console.log(chain);
    const contract = require(`../contracts/${chain}/SafeZen.json`);
    /* eslint-enable global-require */
    return new ethers.Contract(envConfig.SAFEZEN_CA, contract.abi, undefined);
  } catch (error) {
    console.error('Contract does not exist!');
  }
};

/**
 * Gets Deployed Contract from contracts folder
 * @param {*} contractName - string
 * @param {*} chainId - number
 * @returns Contract
 */
export const getGovernanceContract = (chainId: number) => {
  let chain = chainMap[chainId];

  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

  try {
    /* eslint-disable global-require */
    const contract = require(`../contracts/${chain}/Governance.json`);
    /* eslint-enable global-require */
    return new ethers.Contract(
      envConfig.GOVERNANCE_CA,
      contract.abi,
      undefined
    );
  } catch (error) {
    console.error('Contract does not exist!');
  }
};

/**
 * Gets Deployed Contract from contracts folder
 * @param {*} contractName - string
 * @param {*} chainId - number
 * @returns Contract
 */
export const getStakingContract = (chainId: number) => {
  let chain = chainMap[chainId];

  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

  try {
    /* eslint-disable global-require */
    const contract = require(`../contracts/${chain}/Staking.json`);
    /* eslint-enable global-require */
    return new ethers.Contract(envConfig.STAKING_CA, contract.abi, undefined);
  } catch (error) {
    console.error('Contract does not exist!');
  }
};

/**
 * Gets Deployed WebSocket Contract from contracts folder
 * @param {*} contractName - string
 * @param {*} chainId - number
 * @param {*} wsProvider - WebSocketProvider
 * @returns Contract
 */
export const getWsContract = (
  contractName: string,
  chainId: number,
  wsProvider: any
) => {
  let chain = chainMap[chainId];

  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

  try {
    /* eslint-disable global-require */
    const contract = require(`../contracts/${chain}/${contractName}.json`);
    /* eslint-enable global-require */
    return new ethers.Contract(
      envConfig.CONTRACT_ADDRESS,
      contract.abi,
      wsProvider
    );
  } catch (error) {
    console.error('WsContract does not exist!');
  }
};
