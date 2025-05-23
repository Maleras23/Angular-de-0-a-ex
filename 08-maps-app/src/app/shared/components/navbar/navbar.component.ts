import { Component, inject, } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-navbar',
  imports: [ AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  // aqui buscamos saber el URL de la peticion HTML
  router = inject(Router) //auqi injectamos el ibjeto Router que contiene toda la informacion de las rutas

  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    // tap(event => console.log(event)),
    map((event)=> event.url),
    map( url => routes.find( route => `/${ route.path }` === url )?.title ?? 'Mapas' )

  )

  // para trabajar lo anterior como una senal se puede convertir un observable a una senal usando el toSignal()
  pageTitle = toSignal ( this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    // tap(event => console.log(event)),
    map((event)=> event.url),
    map( url => routes.find( route => `/${ route.path }` === url )?.title ?? 'Mapas' )

  ))


  // creamos un arreglo de las rutas que tenemos
  routes = routes.map( route => ({
    path: route.path,
    title: `${route.title ?? 'Mapas en Angular'}`
  })).filter((route)=> route.path !== '**' )
}
