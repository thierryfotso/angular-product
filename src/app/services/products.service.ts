import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[];
  categories: Category[];

  constructor() {
    this.categories = [
      { id: 1, name: 'PC' },
      { id: 2, name: 'Imprimante' },
    ];
    this.products = [
      {
        productId: 1,
        name: 'PC Asus',
        price: 3000,
        creationDate: new Date('01/14/2011'),
        category: { id: 1, name: 'PC' },
      },
      {
        productId: 2,
        name: 'Imprimante Epson',
        price: 450,
        creationDate: new Date('12/17/2010'),
        category: { id: 2, name: 'Imprimante' },
      },
      {
        productId: 3,
        name: 'Tablette Samsung',
        price: 900.123,
        creationDate: new Date('02/20/2020'),
        category: { id: 1, name: 'PC' },
      },
    ];
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find((p) => p.productId == id)!;
  }

  addproduct(product: Product) {
    this.products.push(product);
  }

  deleteProduct(product: Product) {
    const indexToDelete = this.products.indexOf(product, 0);
    if (indexToDelete > -1) {
      this.products.splice(indexToDelete, 1);
    }
  }

  updateProduct(productToUpdate: Product) {
    const indexToDelete = this.products.indexOf(productToUpdate, 0);
    if (indexToDelete > -1) {
      this.products.splice(indexToDelete, 1);
      this.products.splice(indexToDelete, 0, productToUpdate);
    }
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategory(id?: number): Category {
    return this.categories.find((cat) => cat.id == id)!;
  }
}
