import { Routes } from '@angular/router';
import { AuthLayoutPageComponent } from './layout/auth-layout-page/auth-layout-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';

export const authRoutes: Routes = [

  {
    path: '',
    component: AuthLayoutPageComponent ,
    children: [
      {
         path: 'login',
         component: LoginPageComponent
      },
      {
         path: 'register',
         component: RegisterPageComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },

]

export default authRoutes;
