import { LowerCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
  styleUrl: './front-navbar.component.css'
})
export class FrontNavbarComponent {
   authServise = inject(AuthService);

   logOut () {
    this.authServise.logOut();
   }

}
