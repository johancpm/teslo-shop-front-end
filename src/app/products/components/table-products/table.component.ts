import { Component, input } from '@angular/core';
import { Product } from '@products/interfaces/preoductGet-backend';
import { ProductImagePipe } from '@products/pipes/product-images.pipe';
import { PaginationProductComponent } from "../../../shared/components/pagination-product/pagination-product.component";
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'table-products',
  imports: [ProductImagePipe,RouterLink, CurrencyPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  products = input.required<Product[]>()
}
