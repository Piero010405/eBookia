// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST() {
  await supabase.auth.signOut();
  return NextResponse.json({ message: "Sesión cerrada correctamente" });
}
