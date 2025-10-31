"use client";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
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
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/logo.png" alt="eBookia" width={40} height={40} />
        <h1 className="font-bold text-xl">eBookia</h1>
      </div>

      {/* Search */}
      {onSearch && (
        <input
          type="text"
          placeholder="Buscar libro..."
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            onSearch(e.target.value);
          }}
          className="border rounded px-3 py-1 w-1/3 text-sm"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onCartClick}
          className="relative bg-[#23b5bf] text-white p-2 rounded-full hover:bg-cyan-600"
        >
          <FaShoppingCart size={20} />
        </button>
        {user ? (
          <button
            onClick={logout}
            className="text-sm text-[#23b5bf] hover:underline"
          >
            Cerrar sesión
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-[#23b5bf] hover:underline"
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  );
}
