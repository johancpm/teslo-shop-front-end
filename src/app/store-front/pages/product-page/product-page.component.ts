import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductImagePipe } from '@products/pipes/product-images.pipe';
import { ProductService } from '@products/services/get-products.service';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel.component";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
 getProductService = inject(ProductService);
 snapshotRoute = inject(ActivatedRoute).snapshot.params['idSlug'];

 getProductResource = rxResource({
    request: () => ({idCode: this.snapshotRoute}),

    loader: ({request}) => {
       return this.getProductService.getProductIdSlug(request.idCode)
    }
 })
}
