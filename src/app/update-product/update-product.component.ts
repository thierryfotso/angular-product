import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  currentProduct = new Product();
  categories: Category[] = [];
  updateCatId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
    const productId = this.activatedRoute.snapshot.params['id'];
    this.currentProduct = this.productService.getProduct(productId);
    this.updateCatId = this.currentProduct.category?.id;
  }

  updateProduct() {
    this.currentProduct.category = this.productService.getCategory(
      this.updateCatId
    );
    this.productService.updateProduct(this.currentProduct);
    this.router.navigate(['products']);
  }
}
