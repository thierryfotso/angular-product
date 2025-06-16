import { Category } from './../model/category.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  newProduct = new Product();
  newIdCategory!: number;
  newCategory = new Category();
  categories: Category[] = [];
  uploadedImage!: File;
  imagePath: any;

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe((result) => {
      this.categories = result;
    });
  }

  addProduct() {
    this.productService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newProduct.image = img;
        this.newProduct.category = this.categories.find(
          (cat) => cat.id == this.newIdCategory
        );
        this.productService.addproduct(this.newProduct).subscribe((result) => {
          this.router.navigate(['products']);
        });
      });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }

}
