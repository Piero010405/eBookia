"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import CartSidebar from "@/components/CartSidebar";
import { getBooks } from "@/services/bookService";

export default function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const pageSize = 20;

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks(page, pageSize, search);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar onCartClick={() => setShowCart(!showCart)} onSearch={setSearch} />
      <main className="p-6">
        {loading ? (
          <p className="text-center text-gray-400">Cargando libros...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {books.map((b) => (
                <BookCard key={b.isbn} book={b} />
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 bg-[#23b5bf] rounded-lg disabled:opacity-50"
              >
                ← Anterior
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 bg-[#23b5bf] rounded-lg"
              >
                Siguiente →
              </button>
            </div>
          </>
        )}
      </main>
      {showCart && <CartSidebar onClose={() => setShowCart(false)} />}
    </div>
  );
}
