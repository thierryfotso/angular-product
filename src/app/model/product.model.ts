import { Category } from './category.model';
import { Image } from './image.model';
export class Product {
  id?: number;
  name?: string;
  price?: number;
  creationDate?: Date;
  category?: Category;
  image!: Image;
  imageStr!: string;
}
