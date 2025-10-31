import { useState } from "react";

export function useCart() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = (book: any) => {
    setCart((prev) => {
      const exists = prev.find((b) => b.isbn === book.isbn);
      if (exists)
        return prev.map((b) =>
          b.isbn === book.isbn ? { ...b, qty: b.qty + 1 } : b
        );
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

  return { cart, addToCart, removeFromCart, total };
}
