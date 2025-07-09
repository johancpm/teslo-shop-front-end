import { AfterViewInit, Component, inject, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '@auth/services/auth.service';
@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent  {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router)

  hasError = signal<boolean>(false)
  isPosting = signal<boolean>(false)

  myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required ]]
  })

  onSubmit () {
    if(this.myForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return
    }
    const { email, password } = this.myForm.value;

    this.authService.login(email!, password!).subscribe( (isAuthenticated) => {
       if(isAuthenticated) return this.router.navigateByUrl('/');

        this.hasError.set(true);

        setTimeout(() => {
          this.hasError.set(false)
        }, 2000);
        return
    })

  }

}
