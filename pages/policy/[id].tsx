/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import styles from '../../styles/Policy.module.scss';
import { useRouter } from 'next/router';
import useSuperFluid from '../../hooks/useSuperfluid';
import usePolicy from '../../hooks/usePolicy';
import { getDisplayAddress } from '../../utils';
import useStaking from '../../hooks/useStaking';

const Policy = () => {
  const { account, active } = useWeb3React();
  const router = useRouter();
  const [tokenId, setTokenId] = useState<number>(0);
  const [policyDetails, setPolicyDetails] = useState<any>({
    policyHolder: '',
    policyId: 0,
    policyType: '',
    coverageAmount: 0,
    merchant: '',
    minFlowRate: 0,
    purchaseTime: 0,
    isActive: false,
    hasClaimed: false,
    amountPaid: 0,
    baseAmount: 0,
  });

  const { data } = usePolicy(account);

  const { MATICxContract, fUSDCxContract, createNewFlow, deleteFlow } =
    useSuperFluid();

  const { transactionHash, loading, error, redeemRewards } = useStaking();

  const fetchPolicyMetadata = async (url: any) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router && router.query && router.query.id) {
      const _tokenId = (router.query.id as string) || '0';
      const _tokenIdNum = Number(_tokenId);
      setTokenId(_tokenIdNum);
    }
  }, [router]);

  useEffect(() => {
    if (data.tokenPolicy) {
      setPolicyDetails({
        ...policyDetails,
        policyHolder: data.tokenPolicy[0],
        policyId: Number(data.tokenPolicy[1]),
        policyType: data.tokenPolicy[2],
        coverageAmount: Number(data.tokenPolicy[3]),
        merchant: data.tokenPolicy[4],
        minFlowRate: Number(data.tokenPolicy[5]),
        purchaseTime: Number(data.tokenPolicy[6]),
        isActive: data.isPolicyActive,
        hasClaimed: data.tokenPolicy[8],
        amountPaid: Number(data.tokenPolicy[9]),
        baseAmount: Number(data.tokenPolicy[10]),
      });
    }
  }, [data.tokenPolicy]);

  // useEffect(() => {
  //   if (data.tokenPolicyMetadata) {
  //     fetchPolicyMetadata(data.tokenPolicyMetadata);
  //   }
  // }, [data.tokenPolicyMetadata]);

  const formatTime = (_timestamp: number) => {
    // TO FIX TIME STAMP
    const _date = new Date(_timestamp);
    return `${_date.getDate()} ${_date.getMonth()} ${_date.getFullYear()}`;
  };

  const activatePolicy = async () => {
    if (policyDetails.minFlowRate > 0) {
      const result = await createNewFlow(String(policyDetails.minFlowRate));
      console.log('Activated Stream: ', result);
    }
  };

  const deactivatePolicy = async () => {
    if (!policyDetails.isActive) return;
    const result = await deleteFlow();
    console.log('Deactivated Stream: ', result);
  };

  const handleYieldReward = async () => {
    if (!account || !tokenId || tokenId === 0) return;
    await redeemRewards(account, tokenId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>Policy {tokenId}</h3>
        <div className={styles.content}>
          <div>
            <img src={data.tokenPolicyImage} alt={`Policy_${data.tokenId}`} />
          </div>
          <div className={styles.content_details}>
            <p>
              Policy Holder Address:{' '}
              {getDisplayAddress(policyDetails.policyHolder)}
            </p>
            <p>Policy Id: {policyDetails.policyId}</p>
            <p>Policy Type: {policyDetails.policyType}</p>
            <p>Coverage Amount: {policyDetails.coverageAmount}</p>
            <p>Merchant: {policyDetails.merchant}</p>
            <p>Flow Rate: {policyDetails.minFlowRate}</p>
            <p>Purchase Time: {formatTime(policyDetails.purchaseTime)}</p>
            <p>
              Is policy active?:{' '}
              {policyDetails.isActive ? 'Active' : 'Inactive'}
            </p>
            <p>
              Has policy claimed?:{' '}
              {policyDetails.hasClaimed ? 'Claimed' : 'Yet to be claimed'}
            </p>
            <p>Amount Paid: {policyDetails.amountPaid}</p>
            <p>Policy Cost: {policyDetails.baseAmount}</p>
          </div>
        </div>

        <div className={styles.action}>
          {policyDetails.isActive ? (
            <button type='button' onClick={deactivatePolicy}>
              Deactivate
            </button>
          ) : (
            <button type='button' onClick={activatePolicy}>
              Activate
            </button>
          )}
          <button
            type='button'
            onClick={() => router.push(`/claim/${tokenId}`)}
          >
            Claim Insurance
          </button>
          <button type='button' onClick={handleYieldReward}>
            Claim Yield
          </button>
        </div>

        {error && <p>Error while claiming yield: {error}</p>}
        {!loading && transactionHash && !error && (
          <p
            style={{
              fontSize: '1.5rem',
              width: '50rem',
              wordBreak: 'break-word',
            }}
          >
            Your yield transaction hash:{' '}
            <a
              href={`https://mumbai.polygonscan.com/tx/${transactionHash}`}
              target='_blank'
              rel='noreferrer'
            >
              https://mumbai.polygonscan.com/tx/${transactionHash}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Policy;
