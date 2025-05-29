import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Options, ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { AsyncPipe, I18nPluralPipe } from '@angular/common';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

  router = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  gender = toSignal(
    this.router.params.pipe(
      map(({gender}) => gender)
    )
  )

  productsResource = rxResource({
    request: () => ({ gender : this.gender()}),
    loader:({request}) => {
      return this.productsService.getProducts({
        gender: request.gender,
      });
    },
  })
}
