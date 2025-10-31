import { supabase } from "@/lib/supabaseClient";
import { Book } from "@/models/Book";

export async function getBooks(page = 1, pageSize = 20): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (error) throw error;
  return data || [];
}
