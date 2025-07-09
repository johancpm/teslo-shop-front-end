import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NabVarComponentComponent } from "../../shared/nab-var-component/nab-var-component.component";

@Component({
  selector: 'app-layout-admin',
  imports: [RouterOutlet, NabVarComponentComponent],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent {

}
