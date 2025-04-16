import { Component, input } from '@angular/core';
import { GisfListItemComponent } from "./gisf-list-item/gisf-list-item.component";

@Component({
  selector: 'gift-list',
  imports: [GisfListItemComponent],
  templateUrl: './gift-list.component.html',

})
export class GiftListComponent {

  //TODO: imput string[];
  gifs = input.required<string[]>();


}
