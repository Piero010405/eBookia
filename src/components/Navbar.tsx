"use client";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

export default function Navbar({
  onCartClick,
  onSearch,
}: {
  onCartClick: () => void;
  onSearch?: (term: string) => void;
}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [term, setTerm] = useState("");

  return (
    <nav className="bg-white text-[#0d0d0d] shadow px-6 py-3 flex items-center justify-between gap-4">
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/logo.png" alt="eBookia" width={40} height={40} className="rounded-full"/>
        <h1 className="font-bold text-xl">eBookia</h1>
      </div>

      {/* Search */}
      {onSearch && (
        <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            type="text"
            placeholder="Buscar libro..."
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              onSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:border-[#23b5bf] transition duration-150 ease-in-out text-sm  text-gray-700
            "
            aria-label="Buscar libro"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <button
            onClick={logout}
            className="text-sm text-[#23b5bf] hover:underline cursor-pointer"
          >
            Cerrar sesión
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-[#23b5bf] hover:underline cursor-pointer"
          >
            Iniciar sesión
          </button>
        )}
        <button
          onClick={onCartClick}
          className="relative bg-[#23b5bf] text-white p-2 rounded-full hover:bg-cyan-600 cursor-pointer"
        >
          <FaShoppingCart size={20} />
        </button>
      </div>
    </nav>
  );
}
