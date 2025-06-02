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
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
    });
  }

  deleteProduct(product: Product) {
    const isConfirm = confirm('Etes-vous sûr ?');
    if (isConfirm && product.productId) {
      this.productService
        .deleteProduct(product.productId)
        .subscribe((result) => {
          console.log('Product to delete: ', product);
          this.loadProduct();
        });
    }
  }
}
