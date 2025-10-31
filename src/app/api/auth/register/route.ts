import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { email, password, fullName } = await req.json();
  const hashed = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from("users")
    .insert([{ email, full_name: fullName, password: hashed }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: "User created" });
}
