import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path:'reactive',
    // aqui no le colocamos el export default en el componente hijo por lo que tenemos que usar el then
    loadChildren: () => import('./reactive/reactive.routes').then((m) => m.reactiveRoutes),
  },
  {
    path:'auth',
    // aqui si colocamos el export default en el componente hijo
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path:'country',
    loadChildren: () => import('./country/country.routes').then((m) => m.countryRoutes),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  }
];
