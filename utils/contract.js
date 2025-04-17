"use client";
import { BrowserProvider, Contract } from "ethers";
import abi from "./abi.json";

const CONTRACT_ADDRESS = "0xbFc9139741AB279f691a82F31739dDAF6102245A";

export const getVaultContract = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not detected (window or ethereum missing)");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(CONTRACT_ADDRESS, abi, signer);

  return contract;
};