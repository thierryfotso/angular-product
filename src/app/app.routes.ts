import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'updateProduct/:id', component: UpdateProductComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];
