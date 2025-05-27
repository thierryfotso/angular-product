import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  newProduct= new Product();

  constructor(private productService:ProductsService){

  }

  ngOnInit(): void {
  }

  addProduct(){
    this.productService.addproduct(this.newProduct);
  }

}
