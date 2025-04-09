import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";



@Component({
  templateUrl: `./hero-page.component.html`,
  imports: [ UpperCasePipe ],
})
export class HeroPageComponent {

  name = signal("Ironman");
  age = signal(45);


  HeroDescription = computed(() =>{
    const description = `${ this.name() } - ${ this.age() }`;
    return description;
  })

  capitalizedname = computed(() =>{
    const description = this.name().toUpperCase();
    return description;
  })

  changeHero(){
    this.name.set("Spiderman");
    this.age.set(22);
  }

  resetForm(){
    this.name.set("Ironman");
    this.age.set(45);
  }

  changeHeroAge(){
    this.age.set(60);
  }
}


