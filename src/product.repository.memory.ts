import { Injectable } from '@nestjs/common';
import { IProductRepository } from './product.repository';
import { Product } from './types';

@Injectable()
export class ProductRepositoryMemory implements IProductRepository {
  private readonly products: Product[] = [];
  constructor() {}

  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProduct(id: number): Promise<Product> {
    return this.products.find((product) => product.id === id);
  }

  async createProduct(product: Product): Promise<void> {
    this.products.push(product);
  }
}
