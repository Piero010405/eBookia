import { Book } from "@/models/Book";

export interface CartItem extends Book {
  qty: number;
}

export function calculateTotal(cart: CartItem[]): number {
  return cart.reduce(
    (acc, b) => acc + (b.is_in_offer ? b.offer_price || b.price : b.price) * b.qty,
    0
  );
}
