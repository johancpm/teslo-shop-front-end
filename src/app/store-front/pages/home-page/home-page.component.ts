

import { Component, inject, signal } from '@angular/core';
import { ProductService } from '@products/services/get-products.service';
import { rxResource} from '@angular/core/rxjs-interop'
import {  ProductCardsComponent } from '@products/components/products-cards/product-cards.component';
import { PaginationProductComponent } from '@shared/components/pagination-product/pagination-product.component';
import { PaginationService } from '@shared/components/pagination-product/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardsComponent, PaginationProductComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
   servicesProduct = inject(ProductService);
   paginationService = inject(PaginationService);

   productResorce = rxResource({
     request: () => ({pages: this.paginationService.currentPage() - 1}),
     loader: ({request}) =>{
      return this.servicesProduct.getProducts({offset: request.pages *8})
    }
   })
}
