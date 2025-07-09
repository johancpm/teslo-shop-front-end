import { Component, computed, input, linkedSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pagination-product',
  imports: [RouterLink],
  templateUrl: './pagination-product.component.html',
  styleUrl: './pagination-product.component.css'
})
export class PaginationProductComponent {



  pages = input<number>(0)
  currentPage = input<number>(1)

  activePage = linkedSignal(this.currentPage)

  getArrayList = computed(() => {
    return Array.from({length: this.pages()}, (_, n) =>  n + 1 );
  })
}
