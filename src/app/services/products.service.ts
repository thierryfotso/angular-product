import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[];

  constructor() {
    this.products=[
      {
        productId:1,
        productName:'PC Asus',
        productPrice: 3000,
        creationDate: new Date("01/14/2011")
      },
      {
        productId:2,
        productName:"Imprimante Epson",
        productPrice:450,
        creationDate: new Date("12/17/2010"),
      },
      {
        productId:3,
        productName:"Tablette Samsung",
        productPrice:900.123,
        creationDate: new Date("02/20/2020"),
      }

    ];
  }

  getProducts():Product[]{
    return this.products;
  }

  addproduct(product: Product){
    this.products.push(product);
  }
}
