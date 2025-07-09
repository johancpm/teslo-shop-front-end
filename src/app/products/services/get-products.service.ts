
import { User } from './../../auth/interfaces/user-interface';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gender, Product, ProductsInterface } from '@products/interfaces/preoductGet-backend';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


interface Options {
  gender?: string,
  limit?: number,
  offset?: number,
}

const currentProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
}

@Injectable({providedIn: 'root'})
export class ProductService {

  private http = inject(HttpClient);
  private url = environment.baseUrl;
  private productCache = new Map<string,ProductsInterface >()
  private productIdCache = new Map<string,Product >()

  getProducts (option: Options): Observable<ProductsInterface  > {
    const {gender = '', limit = 8, offset = 0 } = option
    const key = `${offset}-${limit}-${gender}` // 0-8-''
    if(this.productCache.has(key)){
      return of(this.productCache.get(key)!)
    }
   return this.http.get<ProductsInterface>(`${this.url}/products`, {
    params: {
    gender,
    limit,
    offset
    }
   })
    .pipe(
      tap(resp => console.log(resp)),
      tap(rest => this.productCache.set(key, rest))
    );
  }

  getProductIdSlug (idSlug: string): Observable<Product > {

       if(idSlug === 'new'){
        return of(currentProduct)
       }

       if( idSlug.length === 0) return of();

       if(this.productIdCache.has(idSlug)){
        return of(this.productIdCache.get(idSlug)!)
       }

       return this.http.get<Product >(`${this.url}/products/${idSlug}`)
       .pipe(
        tap(resp => this.productIdCache.set(idSlug, resp))
       );
  }

  updateProduct ( id: string , product: Partial<Product>, getFileListImg?: FileList): Observable<Product> {

    const imagesProductFile = product.images ?? [];

   return this.uploadImages(getFileListImg)
    .pipe(
      map( resImg => ({
        ...product,
        images: [...imagesProductFile, ...resImg],
      })),
      switchMap( resp => {
        return this.http.patch<Product>(`${this.url}/products/${id}`, resp )
      }),
      tap( produc => this.updateProductCache(produc))
    )
  }

  createProduct (product: Partial<Product>): Observable<Product> {
   return this.http
   .post<Product>(`${this.url}/products`, product)
   .pipe(tap((prod) => this.updateProductCache(prod)))
  }

  updateProductCache (product: Product) {
    const productId = product.id;

    this.productIdCache.set(productId, product);

    this.productCache.forEach( productResponse => {
      productResponse.products = productResponse.products.map( (respCache) => {
        return respCache.id === productId ? product : respCache;
      } )
    } )
  }

  uploadImages (images: FileList | undefined): Observable<string[]> {
    if(!images) return of([]);
     const arrayImg = Array.from(images ?? []).map( resp => {
      return this.uploadImage(resp);
     })

     return forkJoin(arrayImg)
  }

  uploadImage (image: File): Observable<string> {

    const formData = new FormData();
    formData.append('file', image);

    return this.http
     .post<{fileName: string}>(`${this.url}/files/product/`, formData)
     .pipe(
      map( resp => resp.fileName)
     )
  }
}
