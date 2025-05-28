import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURL: string = 'http://localhost:8080/products/api';
  products: Product[] = [];
  categories: Category[];

  constructor(private httpClient: HttpClient) {
    this.categories = [
      { id: 1, name: 'PC' },
      { id: 2, name: 'Imprimante' },
    ];
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiURL);
  }

  getProduct(id: number): Product {
    return this.products.find((p) => p.productId == id)!;
  }

  addproduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiURL, product, httpOptions);
  }

  deleteProduct(productId: number): Observable<Product> {
    const deleteURL = `${this.apiURL}/${productId}`;
    return this.httpClient.delete<Product>(deleteURL, httpOptions);
  }

  updateProduct(productToUpdate: Product) {
    const indexToDelete = this.products.indexOf(productToUpdate, 0);
    if (indexToDelete > -1) {
      this.products.splice(indexToDelete, 1);
      this.products.splice(indexToDelete, 0, productToUpdate);
    }
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategory(id?: number): Category {
    return this.categories.find((cat) => cat.id == id)!;
  }
}
