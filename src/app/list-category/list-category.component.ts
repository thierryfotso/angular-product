import { Category } from './../model/category.model';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
    selector: 'app-list-category',
    imports: [UpdateCategoryComponent],
    templateUrl: './list-category.component.html',
    styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {
  categories!: Category[];
  updateCategory: Category = { id: null, name: '' };
  isAdd = true;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    this.productService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  addCategory(category: Category) {
    this.isAdd = true;
    this.productService.addCategory(category).subscribe((result) => {
      this.loadCategory();
    });
  }

  updateCat(category: Category) {
    this.updateCategory = category;
    this.isAdd = false;
  }
}
