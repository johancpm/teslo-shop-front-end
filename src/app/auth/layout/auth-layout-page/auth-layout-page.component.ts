import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout-page',
  imports: [RouterOutlet],
  templateUrl: './auth-layout-page.component.html',
  styleUrl: './auth-layout-page.component.css'
})
export class AuthLayoutPageComponent {
  titulo = signal<string>('');

  getTitulo (title: any) {
     this.titulo.set(title)
  }
}
