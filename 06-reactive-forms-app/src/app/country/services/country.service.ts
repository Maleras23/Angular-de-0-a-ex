import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({providedIn: 'root'})
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[]{
    return [...this._regions];
  }

  getCountriesByRegion( region: string): Observable<Country[]>{
    // aqui verificamos que exista un string y si no usamos la funcios 'of' de rxjs para crear y retornar un observable basio que sera un arreglo
    if ( !region ) return of([]);
    console.log({region});

    // construimos el URL a usar en la peticion HTTP
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    // vamos a realizar la peticion HTTP usando el metodo get del Httpcliente que fue injectado en la propiedad http
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country>{
    const url = `${ this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]>{
    if ( !countryCodes || countryCodes.length === 0 ) return of([]);

    const countriesRequests : Observable<Country>[] =[];

    countryCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    })

    return combineLatest(countriesRequests);
  }

}
