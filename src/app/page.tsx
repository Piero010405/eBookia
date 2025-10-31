"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BookCard from "@/components/BookCard";
import CartSidebar from "@/components/CartSidebar";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [showCart, setShowCart] = useState(false);

  const pageSize = 20;

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .range((page - 1) * pageSize, page * pageSize - 1);
      if (error) console.error(error);
      else setBooks(data || []);
    };
    fetchBooks();
  }, [page]);

  return (
    <div className="min-h-screen">
      <Navbar onCartClick={() => setShowCart(!showCart)} />
      <main className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {books.map((b) => (
            <BookCard key={b.isbn} book={b} />
          ))}
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-primary rounded disabled:opacity-50"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-primary rounded"
          >
            Siguiente →
          </button>
        </div>
      </main>
      {showCart && <CartSidebar onClose={() => setShowCart(false)} />}
    </div>
  );
}
