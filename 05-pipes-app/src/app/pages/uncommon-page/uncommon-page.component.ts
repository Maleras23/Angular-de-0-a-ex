import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { interval, tap } from 'rxjs';

const client1 = {
  name: 'Carlos',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canada'
}
const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canada'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, KeyValuePipe, TitleCasePipe, AsyncPipe ],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {

  // i18n Select
  client = signal(client1)

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient(){
    if(this.client() === client1){
      this.client.set(client2);
      return;
    }
    this.client.set(client1)
  }

  // i18m plural

  clientMap = signal({
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando'
    }
  )

  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Mireya',
    'Carlos',
    'Melissa',
    'Andrea',
    'Juan'
  ])

  deleteClient(){
      this.clients.update((prev) => prev.slice(1));
  }

  // KeyValuePipe
  profile = {
    name: 'Fernando',
    age:36,
    address: 'Ottawa, Canada'
  }

  // Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa');
      console.log('Promesa finalizada')
    }, 3500)
  })

  myObservableTimer = interval(2000).pipe(
    tap((value) => console.log('tap:', value)))
 }
