import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);


  myForm = this.fb.group( {
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })

  // este efecto llamamos a la fucnion para subcribirnos al observable y tambien realiza el unsubscribe cuando nos salimos y se destruye el componente
  onFormChanged = effect( ( onCleanup ) => {
    const regionSubscription = this.onRegionChange();
    const countrySubscription = this.onCountryChange();

    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    })
  });

  // esta funcion realiza la subscricion para estar pendiente de todos los cambios que se generen en el observable
  onRegionChange(){
    // aqui estamos pendientes de los cambios en la region
    return this.myForm.get('region')!.valueChanges
      .pipe(
        // aqui vamos a user un efecto secundario para limpiar los componentes de nuestro formulario
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        // aqui hacemos lo mismo pero en un tap compuesto de varios efectos para limpiar dos propiedades
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        // este es un operador de rxjs especial para encadenar un observable que cancela la susbcricion anterior y manda el nuevo valor
        switchMap( region => this.countryService.getCountriesByRegion(region ?? ''))
      )
      // lo que recibimos del metodo anterior son los paices que conforman la regino
      .subscribe( countries => {
        // aqui signamos los nuevos paices a la propiedad que creamos para contenerlos y mostrar en el formulario
        this.countriesByRegion.set(countries)
      });
  }

  onCountryChange(){
    return this.myForm.get('country')!.valueChanges
    .pipe(
      // aqui estamos purgando el valor de formulario en la parte de border
      tap(() => this.myForm.get('border')!.setValue('')),
      filter( value => value!.length > 0),
      switchMap( alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '' )),
      switchMap( country => this.countryService.getCountryNamesByCodeArray(country.borders) )
    )

    .subscribe((borders) => {
      this.borders.set(borders);
    })
  }

}
