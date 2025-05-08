import { Pipe, type PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroCreator',
})
export class HeroCreatorPipe implements PipeTransform {

  transform(value: Creator): string {
    return Creator[value]
    // return value ? 'Marvel' : 'DC';
    // return value === Creator.DC ? 'DC' : 'Marvel';
  }

}
