"use client";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  return (
    <nav className="bg-white text-dark shadow px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="eBookia" width={40} height={40} />
        <h1 className="font-bold text-xl">eBookia</h1>
      </div>
      <button
        onClick={onCartClick}
        className="relative bg-primary text-white p-2 rounded-full hover:bg-cyan-600"
      >
        <FaShoppingCart size={20} />
      </button>
    </nav>
  );
}
