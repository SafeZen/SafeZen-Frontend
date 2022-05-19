/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import styles from '../../styles/Policy.module.scss';
import { useRouter } from 'next/router';

const isActive = false;

const Policy = () => {
  const router = useRouter();
  const [tokenId, setTokenId] = useState<number>(0);

  useEffect(() => {
    if (router && router.query && router.query.id) {
      const _tokenId = (router.query.id as string) || '0';
      const _tokenIdNum = Number(_tokenId);
      console.log(_tokenId);
      setTokenId(_tokenIdNum);
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>Policy {tokenId}</h3>
        <p>POLICY META DATA</p>

        <div className={styles.action}>
          {isActive ? <button>Deactivate</button> : <button>Activate</button>}
          <button
            type='button'
            onClick={() => router.push(`/claim/${tokenId}`)}
          >
            Claim Insurance
          </button>
          <button>Claim Yield</button>
        </div>
      </div>
    </div>
  );
};

export default Policy;
