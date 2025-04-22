// app/login/page.tsx
"use client";

import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Decentralized Finance.<br />
          No borders, no intermediaries, no waiting.
        </h1>

        <p className={styles.subtitle}>
          MakerDAO – The future of borrowing and lending. 
          A new way to manage your crypto assets globally and freely.
        </p>

        <div className={styles.buttons}>
          <button 
            onClick={() => router.push("/user")}
            className={styles.primaryButton}
          >
            Log In
          </button>

          <button 
            onClick={() => router.push("/user")}
            className={styles.secondaryButton}
          >
            Sign Up
          </button>
        </div>
      </main>
    </div>
  );
}