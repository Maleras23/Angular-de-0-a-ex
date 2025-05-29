
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import {rxResource} from '@angular/core/rxjs-interop'
// import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  productsService = inject(ProductsService);

  productsResource = rxResource({
    request: () => ({}),
    loader:({request}) => {
      return this.productsService.getProducts({});

    },
  })


  // imagesResource = rxResource({
  //   request: () => ({}),
  //   loader:({request}) => {
  //     return this.productsService.getImage(this.productsResource.value()?.products);

  //   },
  // })


}
