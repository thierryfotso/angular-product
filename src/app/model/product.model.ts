import { Category } from './category.model';
export class Product {
  productId?: number;
  name?: string;
  price?: number;
  creationDate?: Date;
  category?: Category
}
