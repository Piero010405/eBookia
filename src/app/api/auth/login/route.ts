import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  const match = await bcrypt.compare(password, data.password);
  if (!match) return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });

  return NextResponse.json({ message: "Login exitoso", user: data });
}
