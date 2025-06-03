import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SearchByCategoryComponent } from './search-by-category/search-by-category.component';
import { SearchByNameComponent } from './search-by-name/search-by-name.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { productGuard } from './product.guard';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [productGuard],
  },
  { path: 'updateProduct/:id', component: UpdateProductComponent },
  { path: 'searchProductByCategory', component: SearchByCategoryComponent },
  { path: 'searchProductByName', component: SearchByNameComponent },
  { path: 'listCategory', component: ListCategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];
