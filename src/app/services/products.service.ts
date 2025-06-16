import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Image } from '../model/image.model';

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
    return this.httpClient.get<Product[]>(
      environment.API_URL + '/all',
      httpOptions
    );
  }

  getProduct(productId: number): Observable<Product> {
    const getURL = `${environment.API_URL}/${productId}`;
    return this.httpClient.get<Product>(getURL, httpOptions);
  }

  addproduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      environment.API_URL + '/addProduct',
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
      environment.API_URL + '/updateProduct',
      productToUpdate,
      httpOptions
    );
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      environment.CAT_API_URL,
      httpOptions
    );
  }

  getCategory(id: number): Category {
    return this.categories.find((cat) => cat.id == id)!;
  }

  searchByCategory(idCategory: number): Observable<Product[]> {
    const searchByCategoryUrl = `${environment.API_URL}/prodscat/${idCategory}`;
    return this.httpClient.get<Product[]>(searchByCategoryUrl, httpOptions);
  }

  searchByName(productName: string): Observable<Product[]> {
    const searchByNameUrl = `${environment.API_URL}/prodsByName/${productName}`;
    return this.httpClient.get<Product[]>(searchByNameUrl, httpOptions);
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(
      environment.CAT_API_URL,
      category,
      httpOptions
    );
  }

  uploadImageProduct(
    file: File,
    filename: string,
    idProd: number
  ): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${environment.IMAGE_API_URL + '/uplaodImageProd'}/${idProd}`;
    return this.httpClient.post(url, imageFormData);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${environment.IMAGE_API_URL + '/upload'}`;
    return this.httpClient.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${environment.IMAGE_API_URL + '/get/info'}/${id}`;
    return this.httpClient.get<Image>(url);
  }

  deleteImage(id: number) {
    const url = `${environment.IMAGE_API_URL}/delete/${id}`;
    return this.httpClient.delete(url, httpOptions);
  }
}
