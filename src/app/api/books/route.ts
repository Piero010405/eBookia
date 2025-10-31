import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  const search = searchParams.get("search") || "";
  const onlyOffers = searchParams.get("onlyOffers") === "true";

  let query = supabase.from("books").select("*");

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (onlyOffers) {
    query = query.eq("is_in_offer", true);
  }

  query = query
    .range((page - 1) * pageSize, page * pageSize - 1)
    .order("title", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}
