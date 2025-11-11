import { AuthService } from './../services/auth.service';
import { ProductsService } from './../services/products.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { RouterLink } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
    selector: 'app-products',
    imports: [CommonModule, RouterLink],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
      this.products.forEach((prod) => {
        this.productService.loadImage(prod.image?.id).subscribe((img: Image) => {
          prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
      });
    });
  }

  deleteProduct(product: Product) {
    const isConfirm = confirm('Etes-vous sûr ?');
    if (isConfirm && product.id) {
      this.productService.deleteProduct(product.id).subscribe((result) => {
        this.loadProduct();
      });
    }
  }
}
