import { Component, inject, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { CountryService } from '../../../services/country.service';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'country-information-page',
  imports: [ DecimalPipe, RouterLink ],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {

  country = input.required<Country>();

  countryService = inject(CountryService);






}
