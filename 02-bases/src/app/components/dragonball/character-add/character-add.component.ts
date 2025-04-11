import { Component, input, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interfaces';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {

  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter(){
    if(!this.name() || !this.power() || this.power() < 0 ) {
      return;
    }

    const newCharacter: Character = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    };

    // this.characters.update((list) => [... list, newCharacter]);
    this.newCharacter.emit(newCharacter);
    this.resetFiel();
  };

  resetFiel(){
    this.name.set('');
    this.power.set(0);
  };

}

