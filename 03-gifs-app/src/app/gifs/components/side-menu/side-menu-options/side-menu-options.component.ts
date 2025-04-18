import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';

interface MenuOption {
  label: string;
  subLabel: string;
  route: string;
  icon: string;

}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-menu-options.component.html',

})
export class GifsSideMenuOptionsComponent {

  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending' ,
      icon: 'fa-solid fa-chart-line',
    },
    {
      label: 'Buscador',
      subLabel: 'Buscador Gifs',
      route: '/dashboard/search' ,
      icon: 'fa-solid fa-magnifying-glass',
    }
  ];

  service = inject(GifService);

 }
