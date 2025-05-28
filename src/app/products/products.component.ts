import { ProductsService } from './../services/products.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  deleteProduct(product: Product) {
    const isConfirm= confirm("Etes-vous sûr ?");
    if(isConfirm){
      this.productService.deleteProduct(product);
      console.log('Product to delete:', product);
    }
  }
}
