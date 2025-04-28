import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);
  query = signal('');

  // ? Aqui lo hacemos con rxresource que trabaja con observables
  countryResource = rxResource({
    request:() => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query)return of([]);
      return this.countryService.searchByCountry(request.query)
    },
  });


  // ? Esto es como se hace con el resource que es con promesas

  // countryResource = resource({
  //   request:() => ({ query: this.query() }),
  //   loader: async({ request }) => {
  //     if (!request.query)return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   },
  // });

}
