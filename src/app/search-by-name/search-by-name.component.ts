import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterPipe] ,
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.css',
})
export class SearchByNameComponent {
  products!: Product[];
  allProducts!: Product[];
  productName!: string;
  searchTerm!: string;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((p) => {
      this.products = p;
    });
    this.allProducts = [];
    this.productService.getProducts().subscribe((result) => {
      this.allProducts = result;
    });
  }

  searchProductByName() {
    if (this.productName) {
      this.productService.searchByName(this.productName).subscribe((result) => {
        this.products = result;
      });
    } else {
      this.productService.getProducts().subscribe((result) => {
        this.products = result;
      });
    }
  }

  onKeyUp(filterText: string) {
    this.products = this.allProducts.filter((p) =>
      p.name?.toLowerCase().includes(filterText)
    );
  }
}
