"use client";
import { useCart } from "@/hooks/useCart";
import { FaCross } from "react-icons/fa6";

export default function CartSidebar({ onClose }: { onClose: () => void }) {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex justify-end">
      <div className="bg-white w-80 h-full shadow-lg flex flex-col text-dark animate-slide-left">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Tu Carrito</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <FaCross />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={item.isbn} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    S/ {item.is_in_offer ? item.offer_price : item.price} x {item.qty}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.isbn)}
                  className="text-red-500 text-sm"
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4">
          <p className="text-lg font-semibold mb-2">Total: S/ {total.toFixed(2)}</p>
          <button className="w-full bg-primary text-white py-2 rounded hover:bg-cyan-600">
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
