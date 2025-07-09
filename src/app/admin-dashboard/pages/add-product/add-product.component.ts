import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { RouterLinkActive, ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@products/services/get-products.service';
import { map } from 'rxjs';
import { DetailsProductComponent } from './details-product/details-product.component';

@Component({
  selector: 'app-add-product',
  imports: [DetailsProductComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
 routerActive = inject(ActivatedRoute);
 router = inject(Router);
 productService = inject(ProductService);

 idProduct = toSignal(
  this.routerActive.params.pipe(
    map( (param) => param['id'] )
  )
 )

 gerProducResourse = rxResource({
  request: () => ({id: this.idProduct()}),
  loader: ({request}) => {
    return this.productService.getProductIdSlug(request.id)
  }
 })

}
