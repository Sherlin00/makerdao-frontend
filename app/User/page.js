"use client";
import ConnectWallet from "../components/ConnectWallet";
import { useState } from "react";
import { getVaultContract } from "../../utils/contract";
import { formatEther, parseEther } from "ethers";

export default function UserPage() {
  const [collateral, setCollateral] = useState(null);
  const [debt, setDebt] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [repayAmount, setRepayAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleRead = async () => {
    try {
      const contract = await getVaultContract();
      const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });

      const info = await contract.getVaultInfo(account);
      const formattedCollateral = formatEther(info[0]);
      const formattedDebt = formatEther(info[1]);

      setCollateral(formattedCollateral);
      setDebt(formattedDebt);
    } catch (err) {
      console.error("Error reading from contract:", err);
    }
  };

  const handleDeposit = async () => {
    try {
      const contract = await getVaultContract();
      const valueInWei = parseEther(depositAmount.toString());
      const tx = await contract.deposit({ value: valueInWei });
      await tx.wait();
      alert("Deposit successful!");
      setDepositAmount("");
    } catch (err) {
      console.error("Deposit failed:", err);
      alert("Deposit failed. Check console.");
    }
  };

  const handleBorrow = async () => {
    try {
      const contract = await getVaultContract();
      const daiAmount = parseEther(borrowAmount);
      const tx = await contract.borrow(daiAmount);
      await tx.wait();
      alert("Borrow successful!");
      setBorrowAmount("");
    } catch (err) {
      console.error("Borrow failed:", err);
      alert("Borrow failed. Check console.");
    }
  };

  const handleRepay = async () => {
    try {
      const contract = await getVaultContract();
      const signer = await window.ethereum.request({ method: "eth_requestAccounts" });
      const amount = parseEther(repayAmount);

      const daiToken = await contract.daiToken();
      const { ethers } = await import("ethers");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signerObj = await provider.getSigner();
      const dai = new ethers.Contract(daiToken, [
        "function approve(address spender, uint256 amount) public returns (bool)"
      ], signerObj);

      const approveTx = await dai.approve(contract.target, amount);
      await approveTx.wait();

      const tx = await contract.repay(amount);
      await tx.wait();
      alert("Repay successful!");
      setRepayAmount("");
    } catch (err) {
      console.error("Repay failed:", err);
      alert("Repay failed. Check console.");
    }
  };

  const handleWithdraw = async () => {
    try {
      const contract = await getVaultContract();
      const valueInWei = parseEther(withdrawAmount.toString());

      const tx = await contract.withdraw(valueInWei);
      await tx.wait();

      alert("Withdrawal successful!");
      setWithdrawAmount("");
    } catch (err) {
      console.error("Withdrawal failed:", err);
      alert("Withdrawal failed. Check console for details.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Vault</h2>
      <ConnectWallet />

      <button onClick={handleRead} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        View Vault Info
      </button>

      {collateral && debt && (
        <div className="mt-4 space-y-2">
          <p>💰 Collateral: {collateral} ETH</p>
          <p>📉 Debt: {debt} DAI</p>
        </div>
      )}

      {/* Deposit Section */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="ETH amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="mr-2 p-2 border"
        />
        <button onClick={handleDeposit} className="px-4 py-2 bg-green-500 text-white rounded">
          Deposit ETH
        </button>
      </div>

      {/* Borrow Section */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="DAI amount"
          value={borrowAmount}
          onChange={(e) => setBorrowAmount(e.target.value)}
          className="mr-2 p-2 border"
        />
        <button onClick={handleBorrow} className="px-4 py-2 bg-purple-500 text-white rounded">
          Borrow DAI
        </button>
      </div>

      {/* Repay Section */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Repay DAI amount"
          value={repayAmount}
          onChange={(e) => setRepayAmount(e.target.value)}
          className="mr-2 p-2 border"
        />
        <button onClick={handleRepay} className="px-4 py-2 bg-red-500 text-white rounded">
          Repay DAI
        </button>
      </div>

      {/* Withdraw Section */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Withdraw ETH amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="mr-2 p-2 border"
        />
        <button onClick={handleWithdraw} className="px-4 py-2 bg-yellow-500 text-white rounded">
          Withdraw ETH
        </button>
      </div>
    </div>
  );
}