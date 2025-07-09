import { AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild } from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '@products/pipes/product-images.pipe';
@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `,
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges {


  images = input.required<string[]>()

  swipContainer = viewChild.required<ElementRef>('swiperDiv');

  swupper: Swiper | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if( changes['images'].firstChange){
      return;
    }
    if(!this.swupper )return;
    this.swupper.destroy(true, true);
    const paginationElemet: HTMLDivElement = this.swipContainer().nativeElement.querySelector('.swiper-pagination');
    paginationElemet.innerHTML = '';

    setTimeout(() => {
      this.onCHangeCarrousel();
    }, 100);

  }

  ngAfterViewInit(): void {
  this.onCHangeCarrousel();
  }

  onCHangeCarrousel () {
    const element = this.swipContainer().nativeElement;
    if(!element) return;

    this.swupper = new Swiper(element, {


  // Modulos

  modules: [Navigation, Pagination],

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
  }
}
