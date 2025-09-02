import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/preoductGet-backend';
import { ProductImagePipe } from '@products/pipes/product-images.pipe';

@Component({
  selector: 'product-front-cards',
  imports: [SlicePipe, RouterLink, ProductImagePipe],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css'
})
export class ProductCardsComponent {
 product = input.required<Product>()

 classAccent: boolean = false;

 urlImages = computed(() => {
  return  `http://localhost:3000/api/files/product/${this.product()?.images[0]}`
 } )

 mouseEnterDetecte (event: Event) {
  this.classAccent = true
 }

 museOutDetecte (event: Event) {
  this.classAccent = false
 }

}
