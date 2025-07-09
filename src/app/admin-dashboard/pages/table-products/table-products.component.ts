import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TableComponent } from '@products/components/table-products/table.component';
import { ProductService } from '@products/services/get-products.service';
import { PaginationService } from '@shared/components/pagination-product/pagination.service';
import { PaginationProductComponent } from "../../../shared/components/pagination-product/pagination-product.component";


@Component({
  selector: 'app-table-products',
  imports: [TableComponent, PaginationProductComponent],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.css'
})
export class TableProductsComponent {
  productService = inject(ProductService);
  paginationService = inject(PaginationService);
  limitProduct = signal<number>(8)

  products = rxResource({
    request: () => ({
                      page: this.paginationService.currentPage()-1,
                      limit:  this.limitProduct()
                     }),
    loader: ({request}) => {
      return this.productService.getProducts({
                                              offset: request.page *8,
                                              limit: request.limit
                                             })
    }

  })
}
