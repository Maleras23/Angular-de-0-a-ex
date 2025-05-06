import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    // Inicia la navegacion a una rute
    RouterLink,
    // Permite agregar clases css a la ruta que solo se activaran cuando estra activa
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
})
export default class NavbarComponent {

  routes = routes.map((routes) => ({
    title: routes.title ?? '',
    path: routes.path ?? '',
  }))

}
