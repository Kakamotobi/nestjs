export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type NewProduct = Pick<Product, 'name' | 'description' | 'price'>;
