import { Injectable, signal } from '@angular/core';

export type AvailableLocale = 'es'|'fr'|'en';


@Injectable({ providedIn: 'root' })
export class LocaleService {

  private currentLocale = signal<AvailableLocale>('fr');

constructor(){
  //  aqui se toma la info del local storage
  this.currentLocale.set(
    (localStorage.getItem('locale') as AvailableLocale ) ?? 'es'
  );

}
// esto nos permitira obtener el current local
get getLocale(){
  return this.currentLocale()
}

changeLocale(locale: AvailableLocale){
  // aqui grabamos la info en el local storage
  localStorage.setItem('locale', locale);
  this.currentLocale.set(locale);
  window.location.reload();
}


}
