import styles from '../styles/Home.module.scss';
import Meta from '../components/Meta';
import ConnectWallet from '../components/ConnectWallet';

export default function Home() {
  return (
    <div className={styles.container}>
      <Meta />

      <main className={styles.main}>
        <ConnectWallet />
      </main>
    </div>
  );
}
