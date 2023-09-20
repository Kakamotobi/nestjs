import { NewProduct, Product } from './types';

// Interface for Product Repository (DB interface)
export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: NewProduct): Promise<void>;
}

export const IProductRepository = Symbol('IProductRepository');

// Other Notes
// SQLite is a DB used for a small thing (Ex: one program, one device)
// i.e. not for big servers
// Ex: could be used to implement localStorage
