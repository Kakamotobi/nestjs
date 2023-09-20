import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './types';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Product | null> {
    return this.productService.getProduct(parseInt(id));
  }

  @Post()
  createProduct(@Body() product: Product) {
    return this.productService.createProduct(product);
  }
}
