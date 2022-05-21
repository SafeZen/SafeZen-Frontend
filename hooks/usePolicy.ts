import { useState, useEffect, useContext } from 'react';
import envConfig from '../utils/envConfig';
import { getMainContract } from '../utils/contracts';
import { Web3Context } from '../context/web3Context';
import useNetwork from './useNetwork';

interface IData {
  tokenId: any;
  tokenPolicy: any;
  tokenPolicyMetadata: any;
  tokenPolicyImage: any;
  isPolicyActive: boolean;
  isPolicyClaimed: boolean;
}

const usePolicy = (account: string | null | undefined) => {
  const { appState: Web3State } = useContext(Web3Context);

  const {
    rightNetwork,
    loading: checkingNetwork,
    error: networkError,
    checkNetworkName,
  } = useNetwork();

  const [data, setData] = useState<IData>({
    tokenId: null,
    tokenPolicy: null,
    tokenPolicyMetadata: null,
    tokenPolicyImage: null,
    isPolicyActive: false,
    isPolicyClaimed: false,
  });
  const [error, setError] = useState<string>('');
  const [responseCode, setResponseCode] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const chainId = checkNetworkName();
      const NFTContract = getMainContract(chainId);

      if (!account) {
        setData({
          tokenId: 0,
          tokenPolicy: null,
          tokenPolicyMetadata: null,
          tokenPolicyImage: null,
          isPolicyActive: false,
          isPolicyClaimed: false,
        });
        setError('User has yet to connect wallet.');
        return;
      }

      if (!NFTContract) {
        setData({
          tokenId: 0,
          tokenPolicy: null,
          tokenPolicyMetadata: null,
          tokenPolicyImage: null,
          isPolicyActive: false,
          isPolicyClaimed: false,
        });
        setError('Contract does not exist.');
        return;
      }

      if (!Web3State.provider) {
        setData({
          tokenId: 0,
          tokenPolicy: null,
          tokenPolicyMetadata: null,
          tokenPolicyImage: null,
          isPolicyActive: false,
          isPolicyClaimed: false,
        });
        setError('Provider does not exist.');
        return;
      }

      const contract = NFTContract.connect(Web3State.provider);
      const tokenId = await contract.tokenOfOwnerByIndex(account, 0);
      const _tokenId = Number(tokenId);
      console.log('User holding tokenId:', _tokenId);
      const tokenPolicy = await contract.policies(_tokenId);
      const tokenPolicyMetadata = await contract.buildMetadata(_tokenId);
      const tokenPolicyImage = await contract.buildPolicy(_tokenId);
      const isPolicyActive = await contract.isActive(_tokenId);
      const isPolicyClaimed = await contract.isClaimed(_tokenId);

      setData({
        tokenId: _tokenId,
        tokenPolicy,
        tokenPolicyMetadata,
        tokenPolicyImage: `data:image/svg+xml;base64,${tokenPolicyImage}`,
        isPolicyActive,
        isPolicyClaimed,
      });
    } catch (error) {
      console.log('Error from usePolicy', error);

      if (data.tokenId === 0) {
        setData({
          tokenId: 0,
          tokenPolicy: null,
          tokenPolicyMetadata: null,
          tokenPolicyImage: null,
          isPolicyActive: false,
          isPolicyClaimed: false,
        });
      }

      setError(
        'Something went wrong with fetching user minting limits. Please refresh the page.'
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      !data.tokenPolicy &&
      envConfig.CONTRACT_DEPLOYED &&
      !networkError &&
      !checkingNetwork &&
      account &&
      Web3State.provider
    ) {
      fetchData();
    }
  }, [networkError, checkingNetwork, account, Web3State.provider]);

  return { data, error, responseCode, loading, fetchData };
};

export default usePolicy;
