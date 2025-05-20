import { afterNextRender, afterRender, Component, effect, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log = ( ...messages: string[]) => {
  console.log(`${ messages[0] } %c${ messages.slice(1).join(', ') } `, 'color: #baba55 ');
}

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit{
  traditionalProperty = 'Fernando';
  signalProperty = signal('Fernando');

  constructor(){
    log("constructor", "Constructor llamado");
  }

  changeTradicional () {
    this.traditionalProperty = 'Carlos Calzadilla';
  }

  changesignal () {
    this.signalProperty.set('Carlos Calzadilla');
  }

  basicEffect = effect( ( onCleanup ) => {
    log('effect', 'Disparar efectos secundarios');

    onCleanup(() => {
      log("onCleanup", "Se ejecta cuando el efecto se va a destruir")

    })
  })
  ngOnInit(){
    log( "ngOnInit", "Runs once after Angular has initialized all the component's inputs.")
  }
  ngOnChanges(){
    log( "ngOnChanges", "Runs every time the component's inputs have changed.")
  }
  ngDoCheck(){
    log( "ngDoCheck", "Runs every time this component is checked for changes.")
  }
  ngAfterContentInit(){
    log( "ngAfterContentInit", "Runs once after the component's content has been initialized.")
  }
  ngAfterContentChecked(){
    log( "ngAfterContentChecked", "Runs every time this component content has been checked for changes.")
  }
  ngAfterViewInit(){
    log( "ngAfterViewInit", "Runs once after the component's view has been initialized.")
  }
  ngAfterViewChecked(){
    log( "ngAfterViewChecked", "Runs every time the component's view has been checked for changes.")
  }

  ngOnDestroy(){
    log("ngOnDestroy", "Runs once before the component is destroyed.")
  }

  afterNextRender = afterNextRender(() => {
    log( "afterNextRender", "Runs once the next time that all components have been rendered to the DOM.")
  })

  afterRender = afterRender(() => {
    log( "afterRender", "Runs every time all components have been rendered to the DOM.")
  })

}

