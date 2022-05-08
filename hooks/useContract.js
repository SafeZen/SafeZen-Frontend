/**
 * Get an initialized contract
 * @returns Contract
 */
import { useEffect, useState } from 'react';
import envConfig from '../utils/envConfig';
import { getContract } from '../utils/contracts';

import useNetwork from './useNetwork';

const useContract = () => {
  const { checkNetworkName } = useNetwork();
  const [contract, setContract] = useState();

  const initialFunc = () => {
    const networkName = checkNetworkName();
    const NFTContract = getContract(envConfig.CONTRACT_NAME, networkName);
    setContract(NFTContract);
  };

  useEffect(() => {
    initialFunc();
  }, []);

  return { contract };
};

export default useContract;
