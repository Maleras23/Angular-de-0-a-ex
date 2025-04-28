import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";
import { map } from 'rxjs';

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  // countryCode = inject(ActivatedRoute).snapshot.params['code'];

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(params => params['code']))
  );

  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({code: this.query()}),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code)
    }
  })
}
