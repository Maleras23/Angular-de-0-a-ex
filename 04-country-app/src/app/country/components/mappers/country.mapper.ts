import type { Country } from '../../interfaces/country.interface';
import type { RESTCountry } from "../../interfaces/rest-countries.interface";


export class CountryMapper {

  // static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry):Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital: restCountry.capital.join(','),
      population: restCountry.population,
      borders: restCountry.borders,
      area: restCountry.area
    }
  }

  //  static RestCountry[] => country[]

  static mapRestCountriesToCountries(restCountries: RESTCountry[]):Country[]{
    return restCountries.map(this.mapRestCountryToCountry)
  }

}
