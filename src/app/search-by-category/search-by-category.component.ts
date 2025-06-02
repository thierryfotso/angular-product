import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/product.model';
import { CommonModule } from '@angular/common';
import { Category } from '../model/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-by-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-by-category.component.html',
  styleUrl: './search-by-category.component.css',
})
export class SearchByCategoryComponent {
  products: Product[] = [];
  categories!: Category[];
  idCategory!: number;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getCategories().subscribe((result) => {
      this.categories = result;
    });
  }

  onChange(): void {
    this.productService
      .searchByCategory(this.idCategory)
      .subscribe((result) => {
        this.products = result;
      });
  }
}
