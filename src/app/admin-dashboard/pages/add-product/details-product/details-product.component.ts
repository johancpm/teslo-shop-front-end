import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '@products/interfaces/preoductGet-backend';
import { ProductCarouselComponent } from "../../../../products/components/product-carousel/product-carousel.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form-utils';
import { FormErrorLabelComponent } from "../../../../shared/components/form-error-label/form-error-label.component";
import { ProductService } from '@products/services/get-products.service';
import { firstValueFrom, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'details-product',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css'
})
export class DetailsProductComponent implements OnInit {
  product = input.required<Product>()

  fb = inject(FormBuilder)
  router = inject(Router)
  productService = inject(ProductService);
  validatorForm = FormUtils;
  wasSaveMsg = signal<boolean>(false);
  imagesFileList: FileList | undefined = undefined;
  tempImg = signal<string[]>([]);

  currentImagesProduct = computed(() => {
    const imgProducts = [...this.product().images, ...this.tempImg()]
    return imgProducts;
  })

  myForm = this.fb.group({
   title: ['', [Validators.required]],
   description: ['', [Validators.required]],
   slug: ['', [Validators.required,Validators.pattern(FormUtils.slugPattern)]],
   price: [0, [Validators.required]],
   stock: [0, [Validators.required]],
   sizes: [['']],
   images: [[]],
   tags: [''],
   gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })

  sizes = [ 'XS' ,'S', 'M', 'L', 'XL', 'XXL']

  ngOnInit(): void {
    this.setValueInitialForm(this.product())



  }

  setValueInitialForm (formLike: Partial<Product>) {
    /* this.myForm.patchValue(formLike as any) */
    this.myForm.reset(this.product() as any)
    this.myForm.patchValue({tags: formLike.tags?.join(",")})
  }

  selectedSizes (size: string) {
      const currentSize = this.myForm.value.sizes ?? []

      if(currentSize.includes(size)){
        currentSize.splice(currentSize.indexOf(size),1)
      }else{
        currentSize.push(size)
      }

      this.myForm.patchValue({sizes: currentSize});
  }

 async onSubmit() {
   const formValid = this.myForm.valid;
   this.myForm.markAllAsTouched();

   if(!formValid) return ;
   const formValue = this.myForm.value;

   const producLike: Partial<Product> = {
    ...(formValue as any),
    tags:
      formValue.tags
      ?.toLowerCase()
       .split(",")
       .map( res => res.trim())?? []
   }
  if(this.product().id === 'new'){
   const prodcto = await firstValueFrom(
     this.productService.createProduct(producLike),
    )
    console.log('producto Creado con Exito!!'),
    this.router.navigate(['/admin/add-product', prodcto.id])
  }else{
   await firstValueFrom(
      this.productService.updateProduct(this.product().id , producLike, this.imagesFileList)
    )
    console.log('producto Actualizado con Exito');
  }

  this.wasSaveMsg.set(true)
   setTimeout(() => {
     this.wasSaveMsg.set(false)
   }, 2000);

  }

  cargarImgs(evento: Event) {
    const images = (evento.target as HTMLInputElement).files;
    if(!images) return this.tempImg.set([]);
    this.imagesFileList = images;

    const imgLinks = Array.from( images ?? []).map( resImg => {
     return URL.createObjectURL(resImg)
    })



    this.tempImg.set(imgLinks);
  }
}
