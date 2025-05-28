import { Category } from './../model/category.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  newProduct = new Product();
  newIdCategory!:number;
  newCategory = new Category();
  categories: Category[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
  }

  addProduct() {
    this.newCategory = this.productService.getCategory(this.newIdCategory);
    this.productService.addproduct(this.newProduct);
    this.router.navigate(['products']);
  }
}
