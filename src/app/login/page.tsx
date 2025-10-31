"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) await signup(email, password);
      else await login(email, password);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0d0d0d] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-[#0d0d0d] p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? "Crear cuenta" : "Iniciar sesión"}
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#23b5bf] w-full py-2 text-white rounded hover:bg-cyan-600"
        >
          {isRegister ? "Registrarse" : "Entrar"}
        </button>
        <p className="text-center text-sm mt-3">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <span
            className="text-[#23b5bf] cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Inicia sesión" : "Regístrate"}
          </span>
        </p>
      </form>
    </div>
  );
}
