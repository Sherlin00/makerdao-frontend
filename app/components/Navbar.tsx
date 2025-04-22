"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">
        MakerDAO
      </div>
      <div className="space-x-4">
        <Link href="/">
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Home</span>
        </Link>
        <Link href="/user">
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Your Vault</span>
        </Link>
        <Link href="/login">
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Login</span>
        </Link>
      </div>
    </nav>
  );
}