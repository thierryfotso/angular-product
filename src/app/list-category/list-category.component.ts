import { Category } from './../model/category.model';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [UpdateCategoryComponent],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css',
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
    console.log('received Catgory:', this.updateCategory);
    this.productService.addCategory(category).subscribe((result) => {
      console.log('result categories:', this.categories);
      this.loadCategory();
    });
  }

  updateCat(category: Category) {
    this.updateCategory = category;
    this.isAdd = false;
  }
}
