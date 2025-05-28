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

  getProduct(productId: number): Observable<Product> {
    const getURL = `${this.apiURL}/${productId}`;
    return this.httpClient.get<Product>(getURL);
  }

  addproduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiURL, product, httpOptions);
  }

  deleteProduct(productId: number): Observable<Product> {
    const deleteURL = `${this.apiURL}/${productId}`;
    return this.httpClient.delete<Product>(deleteURL, httpOptions);
  }

  updateProduct(productToUpdate: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      this.apiURL,
      productToUpdate,
      httpOptions
    );
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategory(id: number): Category {
    return this.categories.find((cat) => cat.id == id)!;
  }
}
