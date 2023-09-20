import { Inject, Injectable } from '@nestjs/common';
import { NewProduct } from './types';
import { IProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  // Receive DB interface (dependency injection)
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  getProducts() {
    return this.productRepository.getProducts();
  }

  getProduct(id: number) {
    return this.productRepository.getProduct(id);
  }

  createProduct(product: NewProduct) {
    return this.productRepository.createProduct(product);
  }
}

// SQLite is a DB used for a small thing (Ex: one program, one device)
// i.e. not for big servers
// Ex: could be used to implement localStorage
