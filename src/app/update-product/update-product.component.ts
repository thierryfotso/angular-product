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
    this.productService.getCategories().subscribe((result) => {
      this.categories = result;
    });

    const productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe((result) => {
      this.currentProduct = result;
      this.updateCatId = this.currentProduct.category?.id!;
    });
  }

  updateProduct() {
    this.currentProduct.category = this.categories.find(
      cat => cat.id == this.updateCatId
    );

    this.productService
      .updateProduct(this.currentProduct)
      .subscribe((result) => {
        this.router.navigate(['products']);
      });
  }
}
