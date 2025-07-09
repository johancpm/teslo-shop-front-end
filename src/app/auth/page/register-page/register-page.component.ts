import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
   fb = inject(FormBuilder);
   authService = inject(AuthService);
   router = inject(Router);

   isError = signal<boolean>(false);
   isRegisterTrue = signal<boolean>(false)


   myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
   });


   onSubmit() {
    if(this.myForm.invalid){
      this.isError.set(true);
      setTimeout(() => {
        this.isError.set(false)
      }, 2000);
    }

    const {name, email, password } = this.myForm.value;

    this.authService.register(email!, password!, name!).subscribe( (isRegisterApproved) => {
      if(isRegisterApproved) {
        this.myForm.reset()
         this.isRegisterTrue.set(true);
        setTimeout(() => {
          this.isRegisterTrue.set(false)
        }, 2000);
        return
      }

      this.isError.set(true);
      setTimeout(() => {
        this.isError.set(false)
      }, 2000);

      return

    })



   }
}
