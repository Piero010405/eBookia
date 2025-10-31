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

  const finalPrice = book.is_in_offer ? book.offer_price : book.price;

  return (
    // Contenedor principal: Fondo sutil, bordes suaves y sombra de 'Neumorfismo Suave'
    <div className="
      bg-gray-50 
      text-[#0d0d0d] 
      rounded-xl 
      p-5 
      flex 
      flex-col 
      shadow-lg 
      hover:shadow-2xl 
      hover:scale-[1.02] 
      transition 
      duration-300
    ">
      
      {/* 🖼️ Área de la Imagen */}
      <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden border border-gray-100/50">
        
        {isAmazonUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-contain rounded"
          />
        ) : (
          // Asegúrate de importar 'Image' de 'next/image' si estás usando Next.js
          <Image
            src={imageUrl}
            alt={book.title}
            fill
            className="object-contain rounded"
          />
        )}

        {/* Etiqueta de Oferta (Solo si está en oferta) */}
        {book.is_in_offer && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
            ¡Oferta!
          </span>
        )}
      </div>

      {/* 📚 Contenido del Libro */}
      <h3 
        className="font-bold text-xl text-gray-800 truncate" 
        title={book.title} // Tooltip para el título completo
      >
        {book.title}
      </h3>
      <p className="text-sm text-gray-500 font-medium mt-1 mb-2">
        {book.author} 
        <span className="ml-2 text-xs text-gray-400">({book.year_of_publication})</span>
      </p>

      {/* 💰 Sección de Precio */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
        
        <div className="flex flex-col">
          {book.is_in_offer && (
            <span className="text-xs text-gray-400 line-through">
              S/ {book.price}
            </span>
          )}
          <p className="text-[#23b5bf] text-2xl font-extrabold tracking-tight">
            S/ {finalPrice}
          </p>
        </div>

        {/* 🛒 Botón de Agregar al Carrito */}
        <button
          onClick={() => addToCart(book)}
          className="
            bg-[#23b5bf] 
            text-white 
            font-semibold 
            rounded-full 
            px-4 
            py-2 
            text-sm
            shadow-md 
            hover:bg-cyan-600 
            hover:shadow-lg 
            active:bg-cyan-700
            transition 
            duration-200 
            ease-in-out
            cursor-pointer
          "
        >
          Añadir 
        </button>
      </div>
    </div>
  );
}