export interface Book {
  isbn: string;
  title: string;
  author: string;
  year_of_publication: number;
  publisher: string;
  image_url_l?: string;
  price: number;
  offer_price?: number;
  is_in_offer: boolean;
  genre: string;
}
