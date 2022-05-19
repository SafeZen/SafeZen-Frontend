/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import styles from '../../styles/Claim.module.scss';
import { useRouter } from 'next/router';

const isActive = false;

const Claim = () => {
  const router = useRouter();
  const [tokenId, setTokenId] = useState<number>(0);

  useEffect(() => {
    if (router && router.query && router.query.id) {
      const _tokenId = (router.query.id as string) || '0';
      const _tokenIdNum = Number(_tokenId);
      setTokenId(_tokenIdNum);
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>Claim for: Policy {tokenId}</h3>
        <p>POLICY META DATA</p>
      </div>
    </div>
  );
};

export default Claim;
