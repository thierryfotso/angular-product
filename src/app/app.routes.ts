import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SearchByCategoryComponent } from './search-by-category/search-by-category.component';
import { SearchByNameComponent } from './search-by-name/search-by-name.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { productGuard } from './guards/product.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { canActivateAuthRole } from './guards/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  {
    path: 'add-product',
    component: AddProductComponent, canActivate: [canActivateAuthRole], data: { role: 'ADMIN' }
  },
  { path: 'updateProduct/:id', component: UpdateProductComponent },
  { path: 'searchProductByCategory', component: SearchByCategoryComponent },
  { path: 'searchProductByName', component: SearchByNameComponent },
  { path: 'listCategory', component: ListCategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'verifEmail', component: VerifEmailComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full'},
];
