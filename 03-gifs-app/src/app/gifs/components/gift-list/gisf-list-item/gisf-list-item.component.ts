import { Component, input, signal } from '@angular/core';


interface gif{
  class: string,
  src: string,
  alt: string,
}

@Component({
  selector: 'gisf-list-item',
  imports: [],
  templateUrl: './gisf-list-item.component.html',

})
export class GisfListItemComponent {

  // TODO imageurl: strign; input
  imageUrl = input.required<string>();

  // gifs = signal<gif[]>([
  //   {class: "h-auto max-w-full rounded-lg", src: this.imageUrl(), alt:""}
  // ])

}
