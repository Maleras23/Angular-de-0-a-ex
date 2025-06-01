
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import {rxResource} from '@angular/core/rxjs-interop'
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';

// import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  productsService = inject(ProductsService);
  paginationService = inject(PaginationService)

  // activatedRoute = inject(ActivatedRoute);

  // aqui vamos a tomar la ruta activa de forma dinamica
  // currentpage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map( params => (params.get('page') ? +params.get('page')! : 1 ) ),
  //     map( page => (isNaN(page) ? 1 : page))
  //   ),{
  //     initialValue : 1,
  //   }
  // )

  productsResource = rxResource({
    request: () => ({page: this.paginationService.currentpage() - 1}),
    loader:({request}) => {
      return this.productsService.getProducts({
        offset: request.page * 9,
      });

    },
  })


  // imagesResource = rxResource({
  //   request: () => ({}),
  //   loader:({request}) => {
  //     return this.productsService.getImage(this.productsResource.value()?.products);

  //   },
  // })


}
