import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly'
})

export class CanFly implements PipeTransform {
  transform(value:boolean): string {
    if (!value){
      return 'No puede volar'
    } else {
      return 'Puede volar'
    }
  }
}
