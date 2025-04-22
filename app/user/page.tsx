"use client";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Coins, ArrowDownCircle } from "lucide-react";
import ConnectWallet from "../components/ConnectWallet";
import { getVaultContract } from "../../utils/contract";
import { formatEther, parseEther } from "ethers";
import { ethers } from "ethers";

// Extend the Window interface for Ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function UserPage() {
  const [collateral, setCollateral] = useState<string | null>(null);
  const [debt, setDebt] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [borrowAmount, setBorrowAmount] = useState<string>("");
  const [repayAmount, setRepayAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

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
      toast.success("Deposit successful!");
      setDepositAmount("");
    } catch (err) {
      console.error("Deposit failed:", err);
      toast.error("Deposit failed. Check console.");
    }
  };

  const handleBorrow = async () => {
    try {
      const contract = await getVaultContract();
      const daiAmount = parseEther(borrowAmount);
      const tx = await contract.borrow(daiAmount);
      await tx.wait();
      toast.success("Borrow successful!");
      setBorrowAmount("");
    } catch (err) {
      console.error("Borrow failed:", err);
      toast.error("Borrow failed. Check console.");
    }
  };

  const handleRepay = async () => {
    try {
      const contract = await getVaultContract();
      const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const amount = parseEther(repayAmount);

      const daiToken = await contract.daiToken();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signerObj = await provider.getSigner();
      const dai = new ethers.Contract(
        daiToken,
        ["function approve(address spender, uint256 amount) public returns (bool)"],
        signerObj
      );

      const approveTx = await dai.approve(contract.target, amount);
      await approveTx.wait();

      const tx = await contract.repay(amount);
      await tx.wait();
      toast.success("Repay successful!");
      setRepayAmount("");
    } catch (err) {
      console.error("Repay failed:", err);
      toast.error("Repay failed. Check console.");
    }
  };

  const handleWithdraw = async () => {
    try {
      const contract = await getVaultContract();
      const valueInWei = parseEther(withdrawAmount.toString());

      const tx = await contract.withdraw(valueInWei);
      await tx.wait();

      toast.success("Withdrawal successful!");
      setWithdrawAmount("");
    } catch (err) {
      console.error("Withdrawal failed:", err);
      toast.error("Withdrawal failed. Check console for details.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10 px-6">
        <div className="max-w-3xl mx-auto bg-white text-gray-900 rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Your Vault</h2>
          <ConnectWallet />
  
          <div className="text-center mt-4">
            <button
              onClick={handleRead}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Vault Info
            </button>
          </div>
  
          {collateral && debt && (
            <div className="mt-6 text-center space-y-2">
              <p className="text-lg flex items-center justify-center gap-2">
                <Coins className="w-5 h-5 text-green-600" />
                Collateral: <strong>{collateral} ETH</strong>
              </p>
              <p className="text-lg flex items-center justify-center gap-2">
                <ArrowDownCircle className="w-5 h-5 text-red-600" />
                Debt: <strong>{debt} DAI</strong>
              </p>

            </div>
          )}
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Deposit Section */}
            <div>
              <label className="block text-sm font-medium mb-1">ETH to Deposit</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="ETH amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                <button
                  onClick={handleDeposit}
                  className="px-4 bg-green-500 text-white rounded-r hover:bg-green-600"
                >
                  Deposit ETH
                </button>
              </div>
            </div>
  
            {/* Borrow Section */}
            <div>
              <label className="block text-sm font-medium mb-1">DAI to Borrow</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="DAI amount"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                <button
                  onClick={handleBorrow}
                  className="px-4 bg-purple-500 text-white rounded-r hover:bg-purple-600"
                >
                  Borrow DAI
                </button>
              </div>
            </div>
  
            {/* Repay Section */}
            <div>
              <label className="block text-sm font-medium mb-1">DAI to Repay</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Repay DAI amount"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                <button
                  onClick={handleRepay}
                  className="px-4 bg-red-500 text-white rounded-r hover:bg-red-600"
                >
                  Repay DAI
                </button>
              </div>
            </div>
  
            {/* Withdraw Section */}
            <div>
              <label className="block text-sm font-medium mb-1">ETH to Withdraw</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Withdraw ETH amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                <button
                  onClick={handleWithdraw}
                  className="px-4 bg-yellow-500 text-white rounded-r hover:bg-yellow-600"
                >
                  Withdraw ETH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );  
}