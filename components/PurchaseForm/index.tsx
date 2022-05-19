/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import { useContext, useEffect } from 'react';
import styles from './index.module.scss';
import useMint from '../../hooks/useMint';
import { Web3Context } from '../../context/web3Context';

const PurchaseForm = ({
  selectedInsuranceType,
  selectedSubInsuranceType,
}: {
  selectedInsuranceType: any;
  selectedSubInsuranceType: any;
}) => {
  const { appState: Web3State } = useContext(Web3Context);
  const { account, active } = useWeb3React();

  // Using this two parameters and determine the coverage amount from a mapping file
  console.log(selectedInsuranceType);
  console.log(selectedSubInsuranceType);

  const {
    transactionHash,
    responseCode,
    error,
    loading,
    publicMint,
    clearData,
  } = useMint();

  const handlePurchase = async () => {
    if (!Web3State.provider || !account) return;
    await publicMint('0.15', 1, account);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.content}>
          <div>
            <p>Coverage Amount:</p>
            <input />
          </div>
          <div>
            <p>Merchant:</p>
            <input />
          </div>
          <div>
            <p>Flow Rate:</p>
            <input />
          </div>
          <div>
            <p>Base Price:</p>
            <input />
          </div>

          {!loading && transactionHash && !error ? (
            <p>Your transaction hash is {transactionHash}</p>
          ) : (
            <button type='button' onClick={handlePurchase}>
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
