import { AuthService } from './../services/auth.service';
import { ProductsService } from './../services/products.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Product } from '../model/product.model';
import { RouterLink } from '@angular/router';
import { Image } from '../model/image.model';
import { MatTable, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef, MatTableModule, MatTableDataSource } from '@angular/material/table';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-products',
    imports: [CommonModule, MatTableModule, MatSortModule, RouterLink, MatTable, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef, MatPaginator, MatFormField, MatLabel, MatInput],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  productsDisplayedColumns: string[] = ['name', 'price', 'creationDate', 'category', 'image'];
  adminProductsDisplayedColumns: string[] = [...this.productsDisplayedColumns, 'delete', 'update'];
  productDataSource = new MatTableDataSource<Product>();

   @ViewChild(MatPaginator)
   paginator!: MatPaginator;

   @ViewChild(MatSort)
   sort!: MatSort;

  constructor(
    private productService: ProductsService,
    public authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = this.translateService.instant("paginator.itemsPerPage");
    this.productDataSource.sort = this.sort;
    this.productDataSource.paginator = this.paginator;
    this.productDataSource.filterPredicate = (data, filter) => {
      const transformedFilter = filter.trim().toLowerCase();

      const matches = (
        (data.id?.toString().toLowerCase().includes(transformedFilter)) ||
        (data.name?.toLowerCase().includes(transformedFilter)) ||
        (data.price?.toString().toLowerCase().includes(transformedFilter)) ||
        (data.creationDate?.toString().toLowerCase().includes(transformedFilter)) ||
        (data.category?.name?.toLowerCase().includes(transformedFilter))
      );

      return Boolean(matches);
    };

    this.productDataSource.sortingDataAccessor = (item: Product, property) => {
      switch (property) {
        //case 'category': return item.category ? item.category?.name : '';
        case 'category': return item.category?.name;
        default:
          return (item as any)[property];
      };
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productDataSource.filter = filterValue.trim().toLowerCase();
    if (this.productDataSource.paginator) {
      this.productDataSource.paginator.firstPage();
    }
  }
  
  loadProduct() {
    this.productService.getProducts().subscribe((result) => {
      result.forEach((prod) => {
        this.productService.loadImage(prod.image?.id).subscribe((img: Image) => {
          prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
      });
      this.productDataSource.data = result;
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
