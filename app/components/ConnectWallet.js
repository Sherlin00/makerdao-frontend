"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
    }
  };

  return (
    <div className="p-4">
      {walletAddress ? (
        <span>Connected: {walletAddress}</span>
      ) : (
        <button onClick={connectWallet} className="bg-green-500 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      )}
    </div>
  );
}