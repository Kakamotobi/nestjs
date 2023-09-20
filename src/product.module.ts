import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { IProductRepository } from './product.repository';
// import { ProductRepositoryMemory } from './product.repository.memory';
import { ProductRepositorySqlite } from './product.repository.sqlite';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: IProductRepository, // DB class interface
      useClass: ProductRepositorySqlite, // Particular DB class to use
    },
  ],
})
export class AppModule {}
