// app/login/page.tsx
"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
      } else {
        setError("Please install MetaMask or another Ethereum wallet");
      }
    } catch (err) {
      setError("Failed to connect wallet");
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Decentralized Finance.<br />
          No borders, no intermediaries, no waiting.
        </h1>
        
        <p className={styles.subtitle}>
          MakerDAO - The future of borrowing and lending. 
          A new way to manage your crypto assets globally and freely.
        </p>

        <div className={styles.buttons}>
          {!account ? (
            <>
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className={styles.primaryButton}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet (Login)'}
              </button>
              
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className={styles.secondaryButton}
              >
                {isConnecting ? 'Connecting...' : 'New Wallet (Sign Up)'}
              </button>
            </>
          ) : (
            <div className={styles.connected}>
              <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
              <button 
                onClick={() => setAccount(null)}
                className={styles.secondaryButton}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </main>
    </div>
  );
}