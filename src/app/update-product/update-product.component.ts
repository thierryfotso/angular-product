import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  currentProduct = new Product();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService, private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['id'];
    this.currentProduct = this.productService.getProduct(productId);
  }

  updateProduct() {
    this.productService.updateProduct(this.currentProduct);
    this.router.navigate(['products']);
  }
}
