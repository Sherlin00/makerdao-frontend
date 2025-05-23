"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) setWallet(accounts[0]);
        });
    }
  }, []);

  const disconnectWallet = () => {
    setWallet(null);
    toast("Signed out");
    router.push("/login");
  };

  const isLoginPage = pathname === "/login";

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-600">MakerDAO</div>

      {isLoginPage ? (
        <div className="flex gap-4">
          <Link href="#"><span className="text-sm text-blue-600 hover:underline">Help</span></Link>
        </div>
      ) : (
        <div className="flex gap-6 items-center">
          <Link href="/"><span className="text-gray-700 hover:text-blue-600 cursor-pointer">Home</span></Link>
          <Link href="/user"><span className="text-gray-700 hover:text-blue-600 cursor-pointer">Your Vault</span></Link>
          {wallet ? (
            <>
              <span className="text-sm text-gray-600">Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}</span>
              <button
                onClick={disconnectWallet}
                className="ml-2 px-2 py-1 text-sm border rounded hover:bg-gray-100"
              >
                Sign Out
              </button>
            </>
          ) : null}
        </div>
      )}
    </nav>
  );
}