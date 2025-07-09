import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const url = environment.baseUrl
@Pipe({
  name: 'productImagesPipe'
})

export class ProductImagePipe implements PipeTransform {
  transform(value: null | string[] | string  ): string {


     if(value === null) return './assents/images/no-image.jpg';

     if(typeof value === 'string' && value.startsWith('blob:')) return value ;

    if(typeof value === 'string') return  `${url}/files/product/${value}`;

    const images = value.at(0);

    if(!images) return './assents/images/no-image.jpg';

    return `${url}/files/product/${images}`
  }
}
