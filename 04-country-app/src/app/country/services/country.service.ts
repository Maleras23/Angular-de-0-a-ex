import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../components/mappers/country.mapper';
import { Country } from '../interfaces/country.interface';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${ query}`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountriesToCountries(restCountries) ),
      catchError((error) => {
        console.log(error)
        return throwError(
          () =>  new Error(`No se pudo obtener paises con ese query ${ query }`) )
      })

    );
  }

  searchByCountry( query: string ): Observable<Country[]> {
    const url = `${API_URL}/name/${ query}`;
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountriesToCountries(restCountries) ),
      delay(2000),
      catchError((error) => {
        console.log(error)
        return throwError(
          () =>  new Error(`2 No se pudo obtener paises con ese query ${ query }`) )
      })

    );
  }

  searchCountryByAlphaCode( code: string ) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map( resp => CountryMapper.mapRestCountriesToCountries(resp) ),
      map( countries => countries.at(0) ),
      catchError((error) => {
        console.log('Error fetching', error)
        return throwError(
          () =>  new Error(`NO se pudo obtener paises con ese codigo ${ code }`) )
      })

    );
  }


}
