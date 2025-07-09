import { Routes } from '@angular/router';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { TableProductsComponent } from './pages/table-products/table-products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      {
        path: 'table-product',
        component: TableProductsComponent,
      },
      {
        path: 'add-product/:id',
        component: AddProductComponent,
      },
      {
        path: '**',
        redirectTo: 'table-product'
      },
    ]
  }
]

export default adminRoutes;
