import { Component, input } from '@angular/core';
import { GisfListItemComponent } from "./gisf-list-item/gisf-list-item.component";
import type { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gift-list',
  imports: [GisfListItemComponent],
  templateUrl: './gift-list.component.html',

})
export class GiftListComponent {

  //TODO: imput string[];
  gifs = input.required<Gif[]>();


}
