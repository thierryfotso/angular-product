import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone:true,
  imports:[],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: string[];

  constructor() {
    this.products = ['PC Asus', 'Imprimante Epson', 'Tablette Samsung'];
  }
  ngOnInit(): void {}
}
