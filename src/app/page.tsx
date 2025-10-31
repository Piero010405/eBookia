"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import CartSidebar from "@/components/CartSidebar";
import { getBooks } from "@/services/bookService";
import { Book } from "@/models/Book";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOnlyOffers, setShowOnlyOffers] = useState(false);

  const pageSize = 20;

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks(page, pageSize, search, showOnlyOffers);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBooks();
  }, [page, search, showOnlyOffers]);


  // Filtrar libros según el estado del filtro
  const filteredBooks = showOnlyOffers
    ? books.filter((book) => book.is_in_offer)
    : books;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar onCartClick={() => setShowCart(!showCart)} onSearch={setSearch} />
      
      <main className="p-6">
        {/* Filtro de ofertas */}
        <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] p-4 rounded-xl border border-[#23b5bf]/20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#23b5bf]/10 px-4 py-2 rounded-lg border border-[#23b5bf]/30">
              <svg 
                className="w-5 h-5 text-[#23b5bf]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span className="text-sm font-medium text-gray-300">Filtros</span>
            </div>
            
            <button
              onClick={() => {
                setShowOnlyOffers(!showOnlyOffers);
                setPage(1);
              }}
              className={`
                px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300
                flex items-center gap-2
                ${showOnlyOffers 
                  ? 'bg-gradient-to-r from-[#23b5bf] to-[#1a9da6] text-white shadow-lg shadow-[#23b5bf]/30' 
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#252525] border border-gray-700'
                }
              `}
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                />
              </svg>
              Solo ofertas
              {showOnlyOffers && (
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {filteredBooks.length}
                </span>
              )}
            </button>
          </div>

          {showOnlyOffers && (
            <div className="flex items-center gap-2 bg-[#23b5bf]/10 px-3 py-1.5 rounded-lg animate-pulse">
              <span className="w-2 h-2 bg-[#23b5bf] rounded-full"></span>
              <span className="text-xs text-[#23b5bf] font-medium">
                Mostrando ofertas especiales
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Cargando libros...</p>
        ) : (
          <>
            {filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <svg 
                  className="w-16 h-16 mx-auto text-gray-600 mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <p className="text-gray-400">
                  No se encontraron libros {showOnlyOffers ? "en oferta" : ""}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {filteredBooks.map((b) => (
                    <BookCard key={b.isbn} book={b} />
                  ))}
                </div>

                <div className="flex justify-center mt-6 space-x-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 bg-[#23b5bf] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a9da6] transition-colors"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 bg-[#23b5bf] rounded-lg hover:bg-[#1a9da6] transition-colors"
                  >
                    Siguiente →
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </main>
      {showCart && <CartSidebar onClose={() => setShowCart(false)} />}
    </div>
  );
}