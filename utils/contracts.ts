import chainMap from './constants/chains';
import { ethers } from 'ethers';
import envConfig from './envConfig';

/**
 * Gets Deployed Contract from contracts folder
 * @param {*} contractName - string
 * @param {*} chainId - number
 * @returns Contract
 */
export const getContract = (contractName: string, chainId: number) => {
  let chain = chainMap[chainId];

  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

  try {
    /* eslint-disable global-require */
    console.log(contractName);
    console.log(chain);
    const contract = require(`../contracts/${chain}/${contractName}.json`);
    /* eslint-enable global-require */
    console.log(contract);
    return new ethers.Contract(
      envConfig.CONTRACT_ADDRESS,
      contract.abi,
      undefined
    );
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
