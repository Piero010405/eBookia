"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthForm() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") await login(form.email, form.password);
    else await register(form.fullName, form.email, form.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-dark p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        {mode === "register" && (
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Nombre completo</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Contraseña</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-cyan-600 transition"
        >
          {mode === "login" ? "Entrar" : "Registrarse"}
        </button>

        <p className="text-center text-sm mt-4">
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <button
            type="button"
            className="text-primary ml-1 underline"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </form>
    </div>
  );
}
