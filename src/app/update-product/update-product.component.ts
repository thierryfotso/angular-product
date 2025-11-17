import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../model/category.model';
import { Image } from '../model/image.model';

@Component({
    selector: 'app-update-product',
    imports: [FormsModule, CommonModule],
    templateUrl: './update-product.component.html',
    styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  currentProduct = new Product();
  categories: Category[] = [];
  updateCatId?: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe((result) => {
      this.categories = result;
    });

    const productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe((result) => {
      this.currentProduct = result;
      console.log('current product:', this.currentProduct);
      this.updateCatId = this.currentProduct.category?.id!;
      //this.myImage = 'data:' + result.image?.type + ';base64,' + result.image?.image;
      this.productService
        .loadImage(this.currentProduct.image.id)
        .subscribe((img: Image) => {
          this.myImage = 'data:' + img.type + ';base64,' + img.image;
        });
    });
  }

  updateProduct() {
    this.currentProduct.category = this.categories.find(
      (cat) => cat.id == this.updateCatId
    );
    if (this.isImageUpdated) {
      this.productService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentProduct.image = img;
          this.productService
            .updateProduct(this.currentProduct)
            .subscribe((result) => {
              console.log('image updated:',result);
              this.router.navigate(['products']);
            });
        });
    } else {
      this.productService
        .updateProduct(this.currentProduct)
        .subscribe((result) => {
          this.router.navigate(['products']);
        });
    }
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
}
