import { Component, computed, signal } from "@angular/core";




interface Character {
  id: number;
  name: string;
  power: number;
}



@Component({
  templateUrl: `./dragonball-page.component.html`,
  imports:[]
})
export class DragonBallPageComponent {
  name = signal('');
  power = signal(0);


  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    // {id: 2, name: 'Vegeta', power: 8001},
    // {id: 3, name: 'Piccolo', power: 3001},
    // {id: 4, name: 'Yamcha', power: 500},
  ]);

  powerClases = computed(() => {

  })

  addCharacter(){
    if(!this.name() || !this.power() || this.power() < 0 ) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };

    this.characters.update((list) => [... list, newCharacter]);
    this.resetFiel();
  }

  resetFiel(){
    this.name.set('');
    this.power.set(0);
  }
}
