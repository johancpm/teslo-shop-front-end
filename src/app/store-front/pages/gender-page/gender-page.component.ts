import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/get-products.service';
import { map } from 'rxjs';
import { ProductCardsComponent } from "../../../products/components/products-cards/product-cards.component";
import { PaginationProductComponent } from "../../../shared/components/pagination-product/pagination-product.component";
import { PaginationService } from '@shared/components/pagination-product/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardsComponent, PaginationProductComponent],
  templateUrl: './gender-page.component.html',
  styleUrl: './gender-page.component.css'
})
export class GenderPageComponent {
  serviceProduct = inject(ProductService)
  routerActive = inject(ActivatedRoute);
  paginationService = inject(PaginationService);

  gender = toSignal(
    this.routerActive.params.pipe(
      map( ({gender}) => gender)
    )
  )

  genderResource = rxResource({
    request: () => ({
      gender: this.gender(),
      pagination: this.paginationService.currentPage()-1
    }),

    loader: ({request}) => {
      return this.serviceProduct.getProducts({gender: request.gender, offset: request.pagination * 8})
    }
  })
}
