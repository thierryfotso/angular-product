import { AuthService } from './auth.service';
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

  categories: Category[] = [];

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getProducts(): Observable<Product[]> {
    const jwt = 'Bearer ' + this.authService.getToken();
    const httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.httpClient.get<Product[]>(environment.API_URL + '/all', {
      headers: httpHeaders,
    });
  }

  getProduct(productId: number): Observable<Product> {
    const jwt = 'Bearer ' + this.authService.getToken();
    const httpHeaders = new HttpHeaders({ Authorization: jwt });
    const getURL = `${environment.API_URL}/${productId}`;
    return this.httpClient.get<Product>(getURL, { headers: httpHeaders });
  }

  addproduct(product: Product): Observable<Product> {
    const jwt = 'Bearer ' + this.authService.getToken();
    const httpHeaders = httpOptions.headers.append('Authorization', jwt);
    return this.httpClient.post<Product>(environment.API_URL+"/addProduct", product, {
      headers: httpHeaders,
    });
  }

  deleteProduct(productId: number): Observable<Product> {
    const jwt = 'Bearer ' + this.authService.getToken();
    const httpHeaders = httpOptions.headers.append('Authorization', jwt);
    const deleteURL = `${environment.API_URL}/${productId}`;
    return this.httpClient.delete<Product>(deleteURL, { headers: httpHeaders });
  }

  updateProduct(productToUpdate: Product): Observable<Product> {
    const jwt = 'Bearer ' + this.authService.getToken();
    const httpHeaders = httpOptions.headers.append('Authorization', jwt);
    return this.httpClient.put<Product>(environment.API_URL+"/updateProduct", productToUpdate, {
      headers: httpHeaders,
    });
  }

  getCategories(): Observable<Category[]> {
    const jwt = 'Bearer ' + this.authService.getToken();
    const httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.httpClient.get<Category[]>(environment.CAT_API_URL, {
      headers: httpHeaders,
    });
  }

  getCategory(id: number): Category {
    return this.categories.find((cat) => cat.id == id)!;
  }

  searchByCategory(idCategory: number): Observable<Product[]> {
    const jwt = 'Bearer ' + this.authService.getToken();
    const httpHeaders = new HttpHeaders({ Authorization: jwt });
    const searchByCategoryUrl = `${environment.API_URL}/prodscat/${idCategory}`;
    return this.httpClient.get<Product[]>(searchByCategoryUrl, {
      headers: httpHeaders
    });
  }

  searchByName(productName: string): Observable<Product[]> {
    const jwt = 'Bearer ' + this.authService.getToken();
    const httpHeaders = new HttpHeaders({ Authorization: jwt });
    const searchByNameUrl = `${environment.API_URL}/prodsByName/${productName}`;
    return this.httpClient.get<Product[]>(searchByNameUrl,{headers: httpHeaders});
  }

  addCategory(category: Category): Observable<Category> {
    const jwt = 'Bearer ' + this.authService.getToken();
    const httpHeaders = httpOptions.headers.append('Authorization', jwt);
    return this.httpClient.post<Category>(environment.CAT_API_URL, category, {
      headers: httpHeaders,
    });
  }
}
