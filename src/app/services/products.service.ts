import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.API_URL);
  }

  getProduct(productId: number): Observable<Product> {
    const getURL = `${environment.API_URL}/${productId}`;
    return this.httpClient.get<Product>(getURL);
  }

  addproduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      environment.API_URL,
      product,
      httpOptions
    );
  }

  deleteProduct(productId: number): Observable<Product> {
    const deleteURL = `${environment.API_URL}/${productId}`;
    return this.httpClient.delete<Product>(deleteURL, httpOptions);
  }

  updateProduct(productToUpdate: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      environment.API_URL,
      productToUpdate,
      httpOptions
    );
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(environment.CAT_API_URL);
  }

  getCategory(id: number): Category {
    return this.categories.find((cat) => cat.id == id)!;
  }

  searchByCategory(idCategory: number): Observable<Product[]> {
    const searchByCategoryUrl = `${environment.API_URL}/prodscat/${idCategory}`;
    return this.httpClient.get<Product[]>(searchByCategoryUrl);
  }

  searchByName(productName: string): Observable<Product[]> {
    const searchByNameUrl = `${environment.API_URL}/prodsByName/${productName}`;
    return this.httpClient.get<Product[]>(searchByNameUrl);
  }
}
