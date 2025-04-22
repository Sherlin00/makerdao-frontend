// app/login/page.tsx
"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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

        {/* Buttons to choose Log In / Sign Up */}
        {!account && !showLogin && !showSignup && (
          <div className={styles.buttons}>
            <button
              onClick={() => setShowLogin(true)}
              className={styles.primaryButton}
            >
              Log In
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className={styles.secondaryButton}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Log In Form */}
        {showLogin && (
          <form className={styles.connected}>
            <p className={styles.back} onClick={() => setShowLogin(false)}>← Back</p>
            <input type="text" placeholder="Username" className="block w-full p-2 mb-2 rounded" required />
            <input type="password" placeholder="Password" className="block w-full p-2 mb-2 rounded" required />
            <button type="submit" className={styles.primaryButton}>Submit</button>
          </form>
        )}

        {/* Sign Up Form */}
        {showSignup && (
          <form className={styles.connected}>
            <p className={styles.back} onClick={() => setShowSignup(false)}>← Back</p>
            <input type="text" placeholder="Name" className="block w-full p-2 mb-2 rounded" required />
            <input type="email" placeholder="Email" className="block w-full p-2 mb-2 rounded" required />
            <input type="password" placeholder="Password" className="block w-full p-2 mb-2 rounded" required />
            <input type="password" placeholder="Confirm Password" className="block w-full p-2 mb-2 rounded" required />
            <button type="submit" className={styles.primaryButton}>Submit</button>
          </form>
        )}

        {account && !showLogin && !showSignup && (
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

        {error && <p className={styles.error}>{error}</p>}
      </main>
    </div>
  );
}