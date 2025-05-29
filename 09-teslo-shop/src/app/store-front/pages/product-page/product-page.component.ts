import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel.component";


@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  productsServices = inject(ProductsService);

  productIdsSlug: string = inject(ActivatedRoute).snapshot.params['idSlug'];

  productResource = rxResource({
    request: () => ({ idSlug: this.productIdsSlug}),
    loader:({request}) => {
      return this.productsServices.getProductByIdSlug(request.idSlug);

    },
  })

 }
