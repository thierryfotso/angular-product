import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[];

  constructor() {
    this.products = [
      {
        productId: 1,
        productName: 'PC Asus',
        productPrice: 3000,
        creationDate: new Date('01/14/2011'),
      },
      {
        productId: 2,
        productName: 'Imprimante Epson',
        productPrice: 450,
        creationDate: new Date('12/17/2010'),
      },
      {
        productId: 3,
        productName: 'Tablette Samsung',
        productPrice: 900.123,
        creationDate: new Date('02/20/2020'),
      },
    ];
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find(p => p.productId == id)!;
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

  updateProduct(productToUpdate:Product) {
    const indexToDelete=this.products.indexOf(productToUpdate,0);
    if(indexToDelete>-1){
      this.products.splice(indexToDelete, 1);
      this.products.splice(indexToDelete, 0, productToUpdate);
    }
  }

}
