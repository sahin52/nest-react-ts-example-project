export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  published: boolean | null;
  ownerId: number | null;
  price: number;
}
