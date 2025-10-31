import BookCard from "./BookCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookGrid({ books }: { books: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.isbn} book={book} />
      ))}
    </div>
  );
}
