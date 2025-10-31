"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CartItem = any & { qty: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: CartItem) => void;
  removeFromCart: (isbn: string) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (book: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((b) => b.isbn === book.isbn);
      if (exists) {
        return prev.map((b) =>
          b.isbn === book.isbn ? { ...b, qty: b.qty + 1 } : b
        );
      }
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const removeFromCart = (isbn: string) => {
    setCart((prev) => prev.filter((b) => b.isbn !== isbn));
  };

  const total = cart.reduce(
    (sum, b) => sum + (b.is_in_offer ? b.offer_price : b.price) * b.qty,
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext must be used within a CartProvider");
  return context;
}
