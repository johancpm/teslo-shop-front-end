import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nab-var-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nab-var-component.component.html',
  styleUrl: './nab-var-component.component.css'
})
export class NabVarComponentComponent {
 authService = inject(AuthService);
}
