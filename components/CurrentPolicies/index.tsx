/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import styles from './index.module.scss';

const Policies = () => {
  const { account, active } = useWeb3React();

  // IF ACCOUNT AND ACTIVE, WE WILL CALL THE SC FETCH ALL THEIR POLICIES
  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>Your Policies</h3>
        {account && active ? (
          <div>DISPLAY POLICIES</div>
        ) : (
          <h4>Please connect your wallet to view your existing policies</h4>
        )}
      </div>
    </div>
  );
};

export default Policies;
