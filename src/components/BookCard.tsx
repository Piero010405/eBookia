import { useCart } from "@/hooks/useCart";
import Image from "next/image"; // Mantenemos la importación para el fallback

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookCard({ book }: { book: any }) {
  const { addToCart } = useCart();
  
  // Usamos directamente la URL de Amazon.
  const amazonUrl = book.image_url_l; 
  
  // Determinamos si vamos a usar la imagen de Amazon o el fallback.
  // Es mejor usar el fallback si la URL de Amazon no existe.
  const imageUrl = amazonUrl || "/no-cover.png";

  // Verificamos si la URL es de Amazon (externa y problemática)
  const isAmazonUrl = imageUrl.startsWith('http://images.amazon.com/');

  return (
    <div className="bg-white text-dark rounded-xl p-4 flex flex-col shadow hover:shadow-lg transition">
      <div className="relative h-48 w-full mb-3">
        
        {isAmazonUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={book.title}
            // Tailwind CSS para simular 'fill' y 'object-contain' de Next/Image
            className="absolute inset-0 w-full h-full object-contain rounded"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={book.title}
            fill
            className="object-contain rounded"
          />
        )}

      </div>
      <h3 className="font-semibold text-lg truncate">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <p className="text-sm text-gray-500">{book.year_of_publication}</p>
      <p className="mt-2 text-primary font-bold">
        S/ {book.is_in_offer ? book.offer_price : book.price}
      </p>
      <button
        onClick={() => addToCart(book)}
        className="mt-auto bg-primary text-white rounded-lg py-2 hover:bg-cyan-600 transition"
      >
        Agregar al carrito
      </button>
    </div>
  );
}