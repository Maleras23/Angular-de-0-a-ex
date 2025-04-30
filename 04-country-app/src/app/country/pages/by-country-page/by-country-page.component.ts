import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  // para hacer que se vea mantenga la ruta de nacegacion
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParams);

  // ? Aqui lo hacemos con rxresource que trabaja con observables
  countryResource = rxResource({
    request:() => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query)return of([]);
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query,
        }
      })
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
