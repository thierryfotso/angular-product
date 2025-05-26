import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor() {
    this.products = [
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

  ngOnInit(): void {

  }

}
