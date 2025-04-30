import { Component, inject, output, signal } from '@angular/core';
import { Region } from '../../../interfaces/type-regions.interface';
import { CountryService } from '../../../services/country.service';


@Component({
  selector: 'regions-bar-page',
  imports: [],
  templateUrl: './regions-bar.component.html',

})
export class RegionsBarComponent {
  countryService = inject(CountryService);
  outValue = output<Region | null>()
  selectedRegion= signal<Region | null>(null);

  region = signal([])

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

}
