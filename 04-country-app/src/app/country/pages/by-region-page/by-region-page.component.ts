
import { Component, signal, inject, linkedSignal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";

import { RegionsBarComponent } from "./regions-bar/regions-bar.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/type-regions.interface';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryParam( queryParam: string ): Region | null{
  queryParam = queryParam.toLocaleLowerCase();

  const validaRegion: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  };

  return validaRegion[queryParam] ?? 'Americas';

}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent, RegionsBarComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  activatedRoute = inject(ActivatedRoute);
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';


  query = linkedSignal(() =>  validateQueryParam(this.queryParams));
  // query = signal<Region | null >(null);
  countryService = inject(CountryService);
  router = inject(Router);


  countryResource = rxResource({
    request:() => ({ query: this.query() }),
    loader: ({ request }) => {
      // console.log(this.query2())
      if (!request.query)return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: request.query,
        }
      })
      return this.countryService.searchbyRegion(request.query)
    },
  });


 }
