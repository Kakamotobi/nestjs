import { Injectable } from '@nestjs/common';
import { IProductRepository } from './product.repository';
import * as sqlite3 from 'sqlite3';
import { NewProduct, Product } from './types';

@Injectable()
export class ProductRepositorySqlite implements IProductRepository {
  private sqliteDB = new sqlite3.Database('db.sqlite3');
  constructor() {
    this.sqliteDB.serialize(() => {
      this.sqliteDB.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price INTEGER
      )`);
    });
  }

  async getProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.sqliteDB.all('SELECT * FROM products', (error, rows: Product[]) => {
        if (error) {
          reject(error);
        } else {
          const products = [];
          rows.forEach((row) => products.push(row));
          resolve(products);
        }
      });
    });
  }

  async getProduct(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.sqliteDB.get(
        `SELECT * FROM products WHERE id = ?`,
        [id],
        (error, row: Product) => {
          if (error) {
            reject(error);
          } else {
            resolve(row);
          }
        },
      );
    });
  }

  async createProduct(product: NewProduct): Promise<void> {
    return new Promise((resolve, reject) => {
      const { name, description, price } = product;
      this.sqliteDB.run(
        `INSERT INTO products (name, description, price) VALUES (?, ?, ?)`,
        [name, description, price],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  }
}

// SQLite is a DB used for a small thing (Ex: one program, one device)
// i.e. not for big servers
// Ex: could be used to implement localStorage

// Creating unique IDs
// 1. Client/Server - cannot lock resource since there can be multiple clients accessing, which means that there are N number of "places" that are distributing the ID.
// 2. DB - possible to resource lock since there is only (technically) one DB distributing an ID.
// AUTO_INCREMENT locks the resource and creates a new DB. Incoming accesses meanwhile are paused.
// This is why DB is the most resource exhaustive.
