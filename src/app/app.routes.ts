import { Routes } from '@angular/router';
import { AuthAdminGuard } from '@auth/guards/auth-admin.guard';
import { AuthGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [
      AuthGuard
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin.routes'),
    canMatch: [
      AuthAdminGuard
    ]
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
