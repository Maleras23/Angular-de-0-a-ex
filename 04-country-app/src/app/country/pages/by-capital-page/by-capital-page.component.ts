import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);


  // ? Aqui lo hacemos con rxresource que trabaja con observables
  countryResource = rxResource({
    request:() => ({ query: this.query() }),
    loader: ({ request }) => {
      console.log({ query: request.query})
      if (!request.query)return of([]);
      this.router.navigate(['/country/by-capital'],{
        queryParams: {
          query: request.query,
        }
      })
      return this.countryService.searchByCapital(request.query)
    },
  });


  // ? Esto es como se hace con el resource que es con promesas
  // countryResource = resource({
  //   request:() => ({ query: this.query() }),
  //   loader: async({ request }) => {
  //     if (!request.query)return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   },
  // });


  // ? Esta es la forma larga de hacerlo
  // isLoanding = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch( query: string){
  //   if ( this.isLoanding() ) return;

  //   this.isLoanding.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   .subscribe({
  //     next: (countries) => {
  //         this.isLoanding.set(false);
  //         this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoanding.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err)
  //     },
  //   })
  // }
}
