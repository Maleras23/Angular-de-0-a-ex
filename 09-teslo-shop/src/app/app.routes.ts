import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from '@auth/gards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [
      NotAuthenticatedGuard,
      // () => {
      //   console.log('Hola mundo');
      //   return true;
      // }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes')
  },
  {
    path: '',
    loadChildren: ()=> import('./store-front/store-front.routes'),
  },
];
