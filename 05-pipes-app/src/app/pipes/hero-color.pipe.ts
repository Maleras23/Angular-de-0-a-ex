import { Pipe, type PipeTransform } from '@angular/core';
import { Color, Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroColor',
})
export class HeroColorPipe implements PipeTransform {

  transform(value: number): string {

    return Color[value]

    // switch (value) {
    //   case value: 0
    //     return Color[value]
    //   case value: 1
    //     return Color[value]
    //   case value: 2
    //     return Color[value]
    //   default:
    //     return Color[value]
    // }


    // if (value === 0){
    //   return Color[value]
    // }else {
    //   return 'no'
    // }
  }

}
